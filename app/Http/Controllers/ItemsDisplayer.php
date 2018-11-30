<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Consumables;
use App\Http\Controllers\ExceptionsHandler;

class ItemsDisplayer extends Controller {

    // @codeCoverageIgnoreStart
    public function all() {
        $consumables = new Consumables();

        $all_items = $this->itemsDataToArray($consumables->get()->toArray());
        ExceptionsHandler::expectedItemsNotEmpty($all_items);

        return view('consumables', compact('all_items'));
    }

    protected function itemsDataToArray(array $all_items): array {
        foreach ($all_items as $id => $one_item) {
            $all_items[$id]['item_data'] = $this->transformItemsDescriptionToAttributesArray(json_decode($one_item['item_data']));
        }
        return $all_items;
    }

    protected function transformItemsDescriptionToAttributesArray(object $one_item_data): object {

        if (property_exists($one_item_data->details, 'description')) {
            $one_item_data->details->description = preg_split("#\n#", $one_item_data->details->description);
        }
        return $one_item_data;
    }

}
