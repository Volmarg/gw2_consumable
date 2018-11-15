<?php
/**
 * Created by PhpStorm.
 * User: Volmarg Reiso
 * Date: 14.11.2018
 * Time: 19:19
 */

namespace Tests\Unit;

use App\Http\Controllers\helper;
use Tests\TestCase;
use App\Http\Controllers\DisplayItems;
use Tests\DataProviders\DisplayItemsDataProvider as Provider; //TODO: check how to use this in dataProvider

class DisplayItemsTest extends TestCase {

    public $display_items;
    public $display_items_reflection;

    public function setUp() {
        $this->display_items = new DisplayItems();
        $this->display_items_reflection = new \ReflectionClass(get_class($this->display_items));
    }

    /**
     * @covers       \App\Http\Controllers\DisplayItems::transformItemsDescriptionToAttributesArray();
     * @dataProvider \Tests\DataProviders\DisplayItemsDataProvider::ItemsDescriptionToArray()
     */

    public function testItemsDescriptionToArray($object) {

        $method = $this->display_items_reflection->getMethod('transformItemsDescriptionToAttributesArray');
        $method->setAccessible(true);
        $result = $method->invokeArgs($this->display_items, array($object));

        $this->assertInternalType('object', $result);
        $this->assertObjectHasAttribute('details', $result);
        $this->assertObjectHasAttribute('description', $result->details);
        $this->assertInternalType('array', $result->details->description);
        $this->assertNotEmpty($result->details->description[0]);

    }

    /**
     * @covers       \App\Http\Controllers\DisplayItems::itemsDataToArray();
     * @dataProvider \Tests\DataProviders\DisplayItemsDataProvider::ItemsDataToArray()
     */

    public function testItemsDataToArray($items) {
        $method = $this->display_items_reflection->getMethod('itemsDataToArray');
        $method->setAccessible(true);
        $result = $method->invokeArgs($this->display_items, array($items));


        $this->assertInternalType('array', $result);
        $this->assertContains('item_data', $result);

    }

    public function tearDown() {

    }
}