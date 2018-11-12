<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Consumables;

class DisplayItems extends Controller {
    public function all() {
        $consumables = new Consumables();
        $all_items = $this->ItemsDataToArray($consumables->get()->toArray());

        return view('consumables', compact('all_items'));
    }

    public function ItemsDataToArray($all_items) {

        foreach ($all_items as $id => $one_item) {
            $all_items[$id]['item_data'] = json_decode($one_item['item_data']);
        }
        return $all_items;
    }
}
