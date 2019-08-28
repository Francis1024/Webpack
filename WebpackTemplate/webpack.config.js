const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // mode: "development",
  mode: "production",
  // devtool: inline - source - map,
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    // 编译成功打开浏览器
    open: true,
    //必须配置的选项，服务启动的目录，默认为根目录
    contentBase: "./dist",
    // 使用热加载时需要设置为true
    hot: false,
    /**
     * 下面为可选配置
     * @param {String} host 指定一个host ,默认是localhost
     * @param {Boolean} overlay 出现错误时是否在浏览器上出现遮罩层提示
     * @param {String} host 指定一个host ,默认是localhost
     */
    host: "localhost",
    /**
     * @param {String} port 端口号码
     */
    // port: "12342",
    /**
     * @param {Object} historyApiFallback 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过设置为 true 进行启用
     * @param {Boolean} disableDotRule
     */
    historyApiFallback: {
      disableDotRule: true
    },
    // 出现错误时是否在浏览器上出现遮罩层提示
    overlay: true,
    /**
     * 在 dev-server 的两种不同模式之间切换
     *   默认情况下，应用程序启用内联模式 inline
     *   设置为 false，使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息
     */
    inline: true,
    /**
     * 统计信息，枚举类型，可供选项：
     *      "errors-only": 只在发生错误时输出
     *      "minimal": 只在发生错误或有新的编译时输出
     *      "none": 没有输出
     *      "normal": 标准输出
     *      "verbose": 全部输出
     */
    stats: "errors-only",

    // 设置接口请求代理，更多 proxy 配置请参考 https://github.com/chimurai/http-proxy-middleware#options
    proxy: {
      "/api/": {
        changeOrigin: true,
        // 目标地址
        target: "http://localhost:3000",
        // 重写路径
        pathRewrite: {
          "^/api/": "/"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 用于生成的HTML文档的标题
      title: "Webpack 开发环境配置",
      // webpack 生成模板的路径
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new ProgressBarPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/react"],
              plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
            }
          }
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },

      // 解析css
      {
        test: /\.css$/,
        use: [
          "style-loader",
          // 还可以给 loader 添加一些配置
          {
            loader: "css-loader",
            options: {
              // 开启 sourceMop
              sourceMap: true
            }
          }
        ]
      },
      // scss 转译
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      // 解析图片资源
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      // 解析数据资源
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      // 解析数据资源
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      // 解析 MakeDown 文件
      {
        test: /\.md$/,
        use: ["html-loader", "markdown-loader"]
      }
    ]
  },
  resolve: {
    // alias: {
    //   src: path.resolve(__dirname, "src")
    // }
  },
  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin({
        extractComments: false,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
