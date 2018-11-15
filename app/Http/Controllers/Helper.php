<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Helper extends Controller {
    public static function stdDump($STD) {
        $STD = var_export($STD, true);
        printf("STD: " . $STD, STDOUT);
    }
}
