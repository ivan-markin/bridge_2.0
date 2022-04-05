const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPreconfigured = (filename) =>
  new HtmlWebpackPlugin({
    filename: filename + ".html",
    template: path.resolve(__dirname, "./src/" + filename + ".html"),
    hash: false,
    inject: true,
    minify: false,
    options: {
      interpolate: true,
      attrs: [
        ":srcset",
        ":data-srcset",
        "img:data-src",
        "img:src",
        "audio:src",
        "video:src",
        "track:src",
        "embed:src",
        "source:src",
        "input:src",
        "object:data",
        "script:src",
      ],
    },
  });

module.exports = {
  entry: __dirname + "/src/index.ts",
  mode: "development",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devServer: {
    allowedHosts: "all",
    hot: true,
    liveReload: true,
    static: path.join(__dirname, "dist"),
  },
  target: ["web", "es5"],
  devtool: "source-map",
  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: Infinity,
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 1000000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|mp4|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: (extra) => extra.filename.replace("src/", ""),
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "resolve-url-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [
    htmlWebpackPreconfigured("index"),
    htmlWebpackPreconfigured("confirm"),
    htmlWebpackPreconfigured("congratulations"),
    htmlWebpackPreconfigured("page-instructions"),
    htmlWebpackPreconfigured("page-reviews"),
    htmlWebpackPreconfigured("page"),
    htmlWebpackPreconfigured("bridge-page"),
    htmlWebpackPreconfigured("not-found"),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
