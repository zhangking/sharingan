'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

module.exports = {
    entry: {
       index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: '[name].js',
        publicPath: '/docs/'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: 9000
    }
};
