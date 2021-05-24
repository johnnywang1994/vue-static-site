const path = require('path');
const { DefinePlugin } = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';


/**
 * Development mode
 */
const config = {
  mode: process.env.NODE_ENV,
  devtool: false,
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'vue-static-site.js',
    library: {
      root: 'initSite',
      amd: 'vue-static-site',
      commonjs: 'vue-static-site'
    },
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  // optimization: {
  //   splitChunks: { chunks: 'all' },
  // },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.vue',
    ],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    minimizer: [],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    disableHostCheck: true,
    inline: true,
    hot: true,
    historyApiFallback: true,
    overlay: { errors: true },
    quiet: true, // close for using friendly error plugin
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    axios: 'axios',
    'highlight.js': 'hljs',
  },
};


/**
 * Plugins
 */

config.plugins = [
  // https://blog.csdn.net/qq_16559905/article/details/109819995
  // for vue3.x config
  new DefinePlugin({
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  }),
  new FriendlyErrorsWebpackPlugin(),
  new VueLoaderPlugin(),
];

if (!isProd) {
  config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    filename: 'index.html',
    inject: 'head',
    minify: isProd
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        }
      : false,
  }));
}

/**
 * Modules
 */

config.module = {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [path.resolve(__dirname, './src')],
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload: false, // disables Hot Reload
      },
    },
    {
      test: /\.s?css$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            esModule: false,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                ['postcss-preset-env'],
              ],
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            additionalData: `
              @import "./src/styles/mixins.scss";
            `,
          },
        },
      ],
    },
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude: /node_modules/,
      include: [path.resolve(__dirname, './src')],
      options: { emitWarnings: true },
    },
  ]
};


/**
 * Production mode
 */
if (isProd) {
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const TerserPlugin = require('terser-webpack-plugin');
  config.devtool = false;
  config.output.filename = 'vue-static-site.min.js';
  config.plugins.push(new CleanWebpackPlugin());
  config.optimization.minimizer.push(new TerserPlugin());

  // css optimiztion
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'vue-static-site.min.css',
  }));
  config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin());
}

module.exports = config;
