<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;

class Consumables extends Model {

    public function removeAllRows() {
        $this::truncate();
        Artisan::call('migrate', array(
            '--force' => true
        ));
    }

    public function insertOneItem($item_data) {
        $this->insert([
            'item_id' => $item_data->id,
            'item_data' => json_encode($item_data)
        ]);
    }

}
