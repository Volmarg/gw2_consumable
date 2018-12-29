<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Laravel</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">

    <link href="{{asset('css/components.css')}}" rel="stylesheet"/>
    <link href="{{asset('css/global.css')}}" rel="stylesheet"/>
</head>
<body>

<div class="flex-center position-ref full-height" id="app">

    @yield('filters')
    @yield('body-center')

</div>

<script src="{{ asset('js/bundle.js') }}"></script>

</body>
</html>
