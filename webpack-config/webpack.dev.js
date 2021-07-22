const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包工具
const webpack = require('webpack');
// 识别某些类别的webpack错误
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 获取IP
const ip = require('ip').address().toString();

const { baseConfig, ROOT_PATH, projectEnName } = require('./webpack.base.conf');

const port = 3000;

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-source-map', // 源错误检查
    entry: (function () {
        const app = [`webpack-dev-server/client?http://${ip}:${port}`, 'webpack/hot/only-dev-server', './src/index.js'];
        return {
            app,
        };
    })(),
    output: {
        path: path.join(ROOT_PATH, 'dev'),
        publicPath: '/',
        filename: `static/scripts/${projectEnName}-[name].js`,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
                html5: true,
            },
            hash: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    // 自动加前缀
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: './',
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false,
                            javascriptEnabled: true,
                            // modifyVars: theme,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        // 热更新服务配置
        port,
        compress: true,
        historyApiFallback: true,
        hot: true, // 开启
        https: false,
        open: true,
        proxy: {},
    },
});
