<?php
/**
 * Created by PhpStorm.
 * User: Volmarg Reiso
 * Date: 14.11.2018
 * Time: 19:53
 */

namespace Tests\DataProviders;


use App\Http\Controllers\Helper;
use Tests\APISampleData\Consumables;

class DisplayItemsDataProvider {

    public static function ItemsDescriptionToArray() {
        $returned_data_set = array();

        Consumables::setStringAcquiredFromApi_multipleItems();
        $array_of_objects = json_decode(Consumables::getStringAcquiredFromApi());
        foreach ($array_of_objects as $one_object) {
            $returned_data_set[] = $one_object;
        }

        return array($returned_data_set);

    }

    public static function ItemsDataToArray() {
        $returned_data_set = array();

        Consumables::setStringAcquiredFromApi_multipleItems();
        $array_of_objects = json_decode(Consumables::getStringAcquiredFromApi());

        //TODO : DEBUG
        foreach ($array_of_objects as $id => $one_object) {
            $returned_data_set[] = array($id => array('item_data' => json_encode($one_object)));
        }

        return array($returned_data_set);

    }


}