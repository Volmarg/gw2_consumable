<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Curl;

class DatabaseUpdate extends Controller {

    protected $curl;

    public function __construct() {
        $this->curl = new Curl\Curl();
    }

    public function update() {
        #$all_food_id = preg_replace('#[\[\]\s]#', '', $this->getAllFoodItemsId());
        $all_food_id=$this->getAllFoodItemsId();
        #$all_food_data = $this->getAllFoodData($all_food_id);
        dd($all_food_id);

    }

    protected function getAllFoodItemsId(): array {
        $all_id=json_decode($this->curl->get('https://api.guildwars2.com/v2/items?type=food'));

        return $all_id;
    }

    protected function getAllFoodData($all_food_id) {
        return $this->curl->get('https://api.guildwars2.com/v2/items?ids=' . $all_food_id);
    }

    private function tests_TODO() {
        # api returned header code
        # returned data formad - is in json?
        # 400 - wrong url
        # 414 - to big request
    }
}
