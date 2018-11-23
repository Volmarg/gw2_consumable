<?php
/**
 * Created by PhpStorm.
 * User: Volmarg Reiso
 * Date: 22.11.2018
 * Time: 18:53
 */

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class DatabaseTest extends TestCase {

    public function setUp() {

    }

    public function testDatabaseFileExists() {
        $file = '../..//database/database.sqlite';
        $this->assertFileExists($file);
    }

    public function testDatabaseNotEmpty() {

    }

    public function tearDown() {

    }
}
