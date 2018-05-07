const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: path.resolve('./src/index.tsx'),
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    compress: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss', '.json' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    "react": "React"
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    }),
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};
