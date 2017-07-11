'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

module.exports = {
    entry: {
       index: './lib/sharingan.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        publicPath: '/build/',
        library: 'sharingan',
        libraryTarget: 'umd'
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }]
    }
};
