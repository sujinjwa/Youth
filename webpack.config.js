// const { NONAME } = require("dns");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode: "development",
  // watch: true,
  entry: {
    main: "./src/client/js/main.js",
    changeHeader: "./src/client/js/changeHeader.js",
    clickBar: "./src/client/js/clickBar.js",
    blogScrollAni: "./src/client/js/blogScrollAni.js",
    messageScrollAni: "./src/client/js/messageScrollAni.js",
    widthResize: "./src/client/js/widthResize.js",
    openAnswer: "./src/client/js/openAnswer",
    toggleBtn: "./src/client/js/toggleBtn",
    alert: "./src/client/js/alert",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          // JS파일에서 CSS 추출
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
