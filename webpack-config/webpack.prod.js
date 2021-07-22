const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { baseConfig, ROOT_PATH } = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: 'production', // mode是webpack4新增的模式
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
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
            chunkFilename: 'static/css/[id]-[chunkhash:10].css',
        }),
        new CopyWebpackPlugin([{ from: `${ROOT_PATH}/src/images`, to: `${ROOT_PATH}/dist/static/images` }]),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
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
