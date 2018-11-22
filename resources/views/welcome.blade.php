<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}"> <!-- this is required for vue (components) to work in laravel !-->
    <title>Laravel</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>
</head>
<body>

<div class="flex-center position-ref full-height" id="app"> <!-- this ID is required for vue (components) to work in laravel !-->

    @yield('filters')
    @yield('body-center')

</div>

<!-- <script src="{{ asset('js/app.js') }}"></script>  this is required for vue (components) to work in laravel !-->
<script src="{{ asset('js/nonVueComponents.js') }}"></script> <!-- this is required for vue (components) to work in laravel !-->

</body>
</html>
