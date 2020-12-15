const path = require("path"); //node.js自带的路径参数
const APP_PATH = path.resolve(__dirname, "../src"); //源文件目录
const DIST_PATH = path.resolve(__dirname, "../dist"); //生产目录
// process: nodeJS  打印警告以及完整堆栈跟踪
process.traceDeprecation = true;
module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "js/[name].[hash].js", //使用hash进行标记
    path: DIST_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: "babel-loader",
        include: APP_PATH,
      },
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          emitWarning: true,
          formatter: require("eslint-friendly-formatter"),
        },
      },
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader", //自动加前缀
          },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]",
              limit: 1000, //是把小于1000B的文件打成Base64的格式，写入JS
            },
          },
        ],
      },
      {
        test: /\.(woff|svg|eot|woff2|tff)$/,
        use: "url-loader",
        exclude: /node_modules/, // exclude忽略/node_modules/的文件夹
      },
    ],
  },
};
