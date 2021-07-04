const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: env || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(less)$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },
              sourceMap: env === 'development'
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }

        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  // optimization: {
  //   runtimeChunk: true,
  //   minimize: env !== 'development',
  //   minimizer: [
  //     new TerserWebpackPlugin({
  //       parallel: true,
  //       terserOptions: {
  //         warnings: false,
  //         parse: {},
  //         compress: {
  //           drop_console: true,
  //           drop_debugger: false,
  //           pure_funcs: ['console.log']
  //         }
  //       }
  //     })
  //   ],
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 100000,
  //     maxSize: 1000000,
  //     minChunks: 1,
  //     maxAsyncRequests: 6,
  //     maxInitialRequests: 4,
  //     automaticNameDelimiter: '-',
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           // get the name. E.g. node_modules/packageName/not/this/part.js
  //           // or node_modules/packageName
  //           const packageName = module.context.match(
  //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
  //           )[1];

  //           // npm package names are URL-safe, but some servers don't like @ symbols
  //           return `npm.${packageName.replace('@', '')}`;
  //         }
  //       }
  //     }
  //   }
  // },
  devtool:
    env === 'development'
      ? 'eval-cheap-module-source-map'
      : 'hidden-source-map'
};
