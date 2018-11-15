<?php
/**
 * Created by PhpStorm.
 * User: Volmarg Reiso
 * Date: 14.11.2018
 * Time: 19:53
 */

namespace Tests\DataProviders;


class DisplayItemsDataProvider {

    public static function ItemsDescriptionToArray() {

        $object = new \stdClass();
        $object->details = new \stdClass();
        $object->details->description = "-line number one \n, -line number two \n, -line number three";

        $object_2 = new \stdClass();
        $object_2->details = new \stdClass();
        $object_2->details->description = 'line 1';

        return [
            [$object],
            [$object_2]
        ];

    }

    public static function ItemsDataToArray() {
//TODO - set proper returned data + provided proper construction for transforming function
        return [
            array( //Test set 1
                array(
                    0 => ['item_data' => self::ItemsDescriptionToArray()[0][0]] #one_item
                ),
                array(
                    1 => ['item_data' => self::ItemsDescriptionToArray()[0][1]] # one_item
                )
            ),
        ];

    }


}