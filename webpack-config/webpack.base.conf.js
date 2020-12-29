const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src'); // 源文件目录
const DIST_PATH = path.resolve(ROOT_PATH, 'dist'); // 打包目录

const projectEnName = 'webpack-demo';
// 主题样式
// const theme = require('../src/common/theme/theme');

// process: nodeJS  打印警告以及完整堆栈跟踪
process.traceDeprecation = true;

const imgLoader = (function () {
    return [
        { type: 'png', mimetype: 'image/png' },
        { type: 'jpg', mimetype: 'image/jpg' },
        { type: 'jpeg', mimetype: 'image/jpeg' },
        { type: 'gif', mimetype: 'image/gif' },
        { type: 'svg', mimetype: 'image/svg' },
    ].map((item) => ({
        test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/images/[name].[ext]',
            mimetype: item.mimetype,
        },
    }));
})();

const fontLoader = (function () {
    return [
        { type: 'woff', mimetype: 'application/font-woff' },
        { type: 'woff2', mimetype: 'application/font-woff2' },
        { type: 'otf', mimetype: 'font/opentype' },
        { type: 'ttf', mimetype: 'application/octet-stream' },
        { type: 'eot', mimetype: 'application/vnd.ms-fontobject' },
        { type: 'svg', mimetype: 'image/svg+xml' },
    ].map((item) => ({
        test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/fonts/[name].[ext]',
            mimetype: item.mimetype,
        },
    }));
})();
module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: DIST_PATH,
        // 使用hash进行标记
        chunkFilename: `static/scripts/${projectEnName}-[name]-[chunkhash:10].js`,
        filename: `static/scripts/${projectEnName}-[name]-[chunkhash:10].js`,
    },
    context: ROOT_PATH,
    resolve: {
        modules: [APP_PATH, 'node_modules'],
        alias: {
            '@': APP_PATH,
            base: path.join(APP_PATH, 'framework/base'),
            framework: path.join(APP_PATH, 'framework'),
            conf: path.join(APP_PATH, 'config'),
        },
        extensions: ['.js', '.jsx', '.json', '.css', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: APP_PATH,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    emitWarning: true,
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                test: /\.jsx?$/,
                include: APP_PATH,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
            ...imgLoader,
            ...fontLoader,
        ],
    },
};
