const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            'all-resources': path.resolve(__dirname, './resources/js')
        }
    },

};

const config = require('./webpack.mix.js');
mix.webpackConfig(config);