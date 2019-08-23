const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name]-[hash:8].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HTMLWebpackPlugin({
      // 用于生成的HTML文档的标题
      title: "Webpack 开发环境配置",
      // webpack 生成模板的路径
      template: "./public/index.html"
    })
  ]
};
