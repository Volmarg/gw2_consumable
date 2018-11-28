<?php
/**
 * Created by PhpStorm.
 * User: Volmarg Reiso
 * Date: 22.11.2018
 * Time: 18:53
 */

namespace Tests\Unit;

use App\Http\Controllers\Helper;
use PHPUnit\Framework\TestCase;
use App\Consumables;

class DatabaseTest extends TestCase {

    public $consumables;

    public function setUp() {
        #This fixes model connection problem
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

        $this->consumables=new Consumables();
    }

    public function testDatabaseFileExists() {
        $file = '../..//database/database.sqlite';
        $this->assertFileExists($file);
    }

    public function testDatabaseNotEmpty() {
        $first_row=$this->consumables->first()->toArray();
        $this->assertNotEmpty($first_row);
        $this->assertArrayHasKey('item_data',$first_row);
    }

    public function tearDown() {

    }
}
