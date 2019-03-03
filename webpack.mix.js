const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.scripts(
    [
        'resources/js/filters/selects/FoodAttributes.js',
        'resources/js/filters/selects/LevelAttributes.js',
        'resources/js/filters/selects/RarityAttributes.js',
        'resources/js/filters/selects/AttributesSelectors.js',
        'resources/js/filters/utils/ItemsVisibility.js',
        'resources/js/filters/utils/CommonUtils.js',
        'resources/js/filters/utils/Config.js',
        'resources/js/filters/Select2ForAttributesSelect.js',
        'resources/js/ajax.js',
        'resources/js/Init.js',
    ],
    'public/js/bundle.js'
);

mix.scripts(
    [
        'resources/js/utils.js',
    ],
    'public/js/utils.js'
);

mix.sass('resources/sass/components.scss'
    , 'public/components.css');