<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExceptionsHandler extends Controller {

    public static function expectedItemsNotEmpty($all_items) {
        if (empty($all_items)) {
            self::throwException(new \Exception('There are no items in database'));
        }
    }

    public static function expectedDatabaseSqliteExists() {
        $database_file_location = __DIR__ . '/../../../database/database.sqlite1';
        if (!file_exists($database_file_location)) {
            self::throwException(new \Exception('Database file not found. Expected location: ' . $database_file_location));

        }
    }

    public static function expectedNoApiErrors($all_id) {
        if (array_key_exists('error', $all_id)) {
            self::throwException(new \Exception('There was an Error while fetching API data: "' . $all_id->error . '"'));
        } elseif (array_key_exists('text', $all_id)) {
            self::throwException(new \Exception('There was an Notice while fetching API data: "' . $all_id->text . '"'));
        }
    }

    public static function expectedJsonFormat() {
        if(json_last_error() !== JSON_ERROR_NONE){
            self::throwException(new \Exception('Fetched API data is not in JSON format'));
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
