<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>
</head>
<body>
<div class="flex-center position-ref full-height">

    <example-component></example-component>
    <food-attribute-selects ></food-attribute-selects>

    @yield('filters')
    @yield('body-center')
</div>

</body>
</html>
