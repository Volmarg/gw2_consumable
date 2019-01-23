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
        'resources/js/components/nonVue/FoodAttributesSelectFilter.js',
        'resources/js/components/nonVue/LevelAttributesSelectFilter.js',
        'resources/js/components/nonVue/RarityAttributesSelectFilter.js',
        'resources/js/components/nonVue/CommonAttributesSelectFilter.js',
        'resources/js/components/nonVue/Select2ForAttributesSelectFilter.js',
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