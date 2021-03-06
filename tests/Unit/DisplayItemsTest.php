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
use App\Http\Controllers\ItemsDisplayer;
use Tests\DataProviders\DisplayItemsDataProvider as Provider; //TODO: check how to use this in dataProvider

class DisplayItemsTest extends TestCase {

    public $display_items;
    public $display_items_reflection;

    public function setUp() {
        $this->display_items = new ItemsDisplayer();
        $this->display_items_reflection = new \ReflectionClass(get_class($this->display_items));
    }

    /**
     * @covers       \App\Http\Controllers\ItemsDisplayer::transformItemsDescriptionToAttributesArray();
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
     * @covers       \App\Http\Controllers\ItemsDisplayer::itemsDataToArray();
     * @dataProvider \Tests\DataProviders\DisplayItemsDataProvider::ItemsDataToArray()
     * @depends testItemsDescriptionToArray
     */

    public function testItemsDataToArray($items) {
        $method = $this->display_items_reflection->getMethod('itemsDataToArray');
        $method->setAccessible(true);
        $result = $method->invokeArgs($this->display_items, array($items));

        $this->assertInternalType('array', $result);
        $this->assertArrayHasKey('item_data', $result[0]);

    }

    public function tearDown() {

    }
}