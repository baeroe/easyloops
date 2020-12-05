'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './client/src/index.js',
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ] 
            },
            {
                test: /\.wav/,
                loader: 'file-loader'
            },
            {
                test: /\.js|jsx/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                options: {
                    configFile: path.join(__dirname, '.babelrc')
                }
            },
            {
                test: /\.html/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']  
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            template: './client/public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './client/dist',
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
};
