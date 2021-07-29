const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包工具
const webpack = require('webpack');
// 获取IP
const { baseConfig } = require('./webpack.base.conf');

const port = 3000;

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map', // 源错误检查
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
    ],
    module: {
        rules: [
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
    },
});
