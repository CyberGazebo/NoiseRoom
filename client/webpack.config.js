const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
  const production = env.NODE_ENV === 'production'

  return {
    mode: production ? 'production' : 'development',
    entry: { admin: path.resolve(__dirname, './src/index.tsx') },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: production ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'babel-plugin-styled-components',
                  {
                    displayName: true, // for auto tests
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          parser: {
            dataUrlCondition: {
              maxSize: 8192,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css'],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(__dirname, './dist/*.html'),
          path.resolve(__dirname, './dist/bundle-*.*'),
        ],
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'NoiseRoom',
        template: './src/index.html',
        // favicon: '.',
      }),
    ],

    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3001,
      hot: true,
    },

    devtool: production ? false : 'source-map',
    mode: production ? 'production' : 'development',
  }
}
