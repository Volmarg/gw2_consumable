<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Curl;
use App\Consumables;
use App\Http\Controllers\ExceptionsHandler;

class DatabaseUpdater extends Controller {

    private $curl;
    private $consumables;

    public function __construct(Consumables $consumables) {
        $this->curl = new Curl\Curl();
        $this->consumables = $consumables;
    }

    public function update() {
        ExceptionsHandler::expectedDatabaseSqliteExists();
        $this->consumables->removeAllRows();
        $all_items_id = $this->getAllItemsId();
        $all_items_data = array_values($this->getAllItemsData($all_items_id));
        if (!empty($all_items_data)) {
            $this->insertConsumablesData($all_items_data);
        }

    }

    protected function getAllItemsId(): array {
        $all_id = json_decode($this->curl->get('https://api.guildwars2.com/v2/items?type=food'));
        ExceptionsHandler::expectedNoApiErrors($all_id);
        ExceptionsHandler::expectedJsonFormat();

        return array_chunk($all_id, 200);
    }

    protected function getAllItemsData(array $all_items_id): array {

        $all_items_data = [];

        foreach ($all_items_id as $dummy_break => $id_list_chunk) {
            $formatted_id_list = preg_replace('#[\[\]\s]#', '', json_encode($id_list_chunk));
            $chunk_items_data = $this->curl->get('https://api.guildwars2.com/v2/items?ids=' . $formatted_id_list);
            $filtered_chunk_items = $this->filterConsumables(json_decode($chunk_items_data));
            $all_items_data = array_merge($all_items_data, $filtered_chunk_items);
            array_values($all_items_data);
        }
        return $all_items_data;
    }

    protected function filterConsumables(array $chunk_items_data): array {

        $acceptable_item_subtypes = array('Utility', 'Food');
        $acceptable_item_types = array('Consumable');

        foreach ($chunk_items_data as $id => $one_item_data) {
            if (!in_array($one_item_data->type, $acceptable_item_types) || !in_array($one_item_data->details->type, $acceptable_item_subtypes)) {
                unset($chunk_items_data[$id]);
            }
        }
        return $chunk_items_data;
    }

    protected function insertConsumablesData(array $all_items_data) {
        foreach ($all_items_data as $one_item_data) {
            $this->consumables->insertOneItem($one_item_data);
        }
    }

}
