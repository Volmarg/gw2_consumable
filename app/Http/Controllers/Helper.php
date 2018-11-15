<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Helper extends Controller {
    public static function stdDump($STD) {
        printf("STD: " . $STD, STDOUT);
    }
}
