<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <!-- this is required for vue (components) to work in laravel !-->
    <title>Laravel</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">

    <!-- TODO: move to scss !-->
    <style>
        body {
            background-color: rgb(26, 134, 150);
        }

        .foodAttributesWrapper #food-attribute-filters{
            display: flex;
            justify-content: center;
        }

        #all-food-items-wrapper > section {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .oneItem * {
            font-family: 'Indie Flower', cursive;
        }

        .oneItem {
            background-color: rgba(42, 43, 60, 1);
            width: 590px;
            height: 185px;
            margin: 10px;
        }

        .oneItem .detailsWrapper {
            margin-left: 30px;
        }

        .oneItem img {
            border: 1px solid rgb(138, 141, 144);
        }

        .oneItem .itemName {
            text-align: center;
            font-size: 19px;
            letter-spacing: 1.2px;
            color: rgb(63, 126, 236);
        }

        .oneItem li {
            font-size: 19px;
            color: rgb(122, 168, 130);
        }

        /* Spinner */
        .lds-dual-ring {
            display: inline-block;
            width: 64px;
            height: 64px;
            position: absolute;
            left: 48%;
        }
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 46px;
            height: 46px;
            margin: 1px;
            border-radius: 47%;
            border: 5px solid rgb(63, 126, 236);
            border-color: rgb(63, 126, 236) transparent rgb(63, 126, 236) transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>

<div class="flex-center position-ref full-height" id="app">
    <!-- this ID is required for vue (components) to work in laravel !-->

    @yield('filters')
    @yield('body-center')

</div>

<!-- <script src="{{ asset('js/app.js') }}"></script>  this is required for vue (components) to work in laravel !-->
<script src="{{ asset('js/bundle.js') }}"></script> <!-- this is required for vue (components) to work in laravel !-->

</body>
</html>
