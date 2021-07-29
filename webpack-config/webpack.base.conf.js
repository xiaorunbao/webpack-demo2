const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src'); // 源文件目录
const DIST_PATH = path.resolve(ROOT_PATH, 'dist'); // 打包目录

const projectEnName = 'webpack-demo';

// process: nodeJS  打印警告以及完整堆栈跟踪
process.traceDeprecation = true;

module.exports = {
    baseConfig: {
        entry: {
            app: './src/index.js',
        },
        output: {
            path: DIST_PATH,
            // 使用hash进行标记
            filename: `static/scripts/${projectEnName}-[name]-[chunkhash:10].js`,
            clean: true,
        },
        plugins: [
            new ESLintPlugin({ fix: true, extensions: ['js', 'jsx'] }),
            new StylelintPlugin({ fix: true, files: ['**/*.{jsx,htm,html,css,less}'] }),
        ],

        context: ROOT_PATH,
        resolve: {
            modules: [APP_PATH, 'node_modules'],
            extensions: ['.js', '.jsx', '.json', '.css', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: APP_PATH,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/images/[name][ext][query]',
                    },
                },
                {
                    test: /\.(woff|woff2|otf|ttf|eot|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/fonts/[name][ext][query]',
                    },
                },
            ],
        },
    },
    ROOT_PATH,
    projectEnName,
};
