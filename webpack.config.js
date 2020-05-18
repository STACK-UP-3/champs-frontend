const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("@babel/polyfill");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./public/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: ["@babel/polyfill", `${__dirname}/src/index.js`],
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: "url-loader" }]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: "source-map",
  plugins: [HtmlWebpackPluginConfig]
};
