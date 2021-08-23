const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { ids } = require('webpack');
const { baseConfig } = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'webpack-demo', // 更改HTML的title的内容
            description: 'webpack打包工具',
            filename: 'index.html',
            // favicon: 'src/images/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]-[chunkhash:10].css',
        }),
        new ids.HashedModuleIdsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    { loader: 'css-loader' },
                    // 自动加前缀
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
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
});
