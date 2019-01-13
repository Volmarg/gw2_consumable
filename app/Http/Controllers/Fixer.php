<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Fixer extends Controller
{
    public function view(){

        return view('fix-endpoint');
    }
}
