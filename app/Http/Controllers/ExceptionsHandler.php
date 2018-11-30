<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExceptionsHandler extends Controller {

    public static function expectedItemsNotEmpty($all_items) {
        if (empty($all_items)) {
            self::throwException(new \Exception('There are no items in database'));
        }
    }

    private static function throwException($thrown_exception) {
        try {
            throw $thrown_exception;
        } catch
        (\Exception $e) {
            dd($e);
        }
    }
}
