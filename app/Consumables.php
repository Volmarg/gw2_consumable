<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consumables extends Model {

    public function insertOneItem($item_data) {
        $this->insert([
            'item_id' => $item_data->id,
            'item_data' => json_encode($item_data)
        ]);
    }

}
