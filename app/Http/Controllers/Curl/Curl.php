<?php

namespace App\Http\Controllers\Curl;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Curl extends Controller {

    public function get($link) {
        $content = $this->initCurl($link);

        return $content;
    }

    protected function initCurl($url) {
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        #Optimization part
        curl_setopt($curl, CURLOPT_ENCODING, '');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_COOKIESESSION, true);
        curl_setopt($curl, CURLOPT_COOKIEJAR, 'cookie-name');
        curl_setopt($curl, CURLOPT_COOKIEFILE, '/var/www/ip4.x/file/tmp');
        curl_setopt($curl, CURLOPT_URL, trim($url));
        $content = curl_exec($curl);
        curl_close($curl);

        return $content;
    }

}
