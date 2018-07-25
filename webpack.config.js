const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');

const DIST = 'dist';

module.exports = {
	entry: { app: './src/app.js'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/dist/',
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		watchContentBase: false,
		// hotOnly: true,
		hot: false,
		publicPath: '/dist/',
	},
  	module: {
    	rules: [
			{
		    	test: /\.js$/,
		    	exclude: /node_modules/,
		    	use: [{ loader: 'babel-loader' }]
			},
			{
		    	test: /\.html$/,
		    	use: ['my-loader']
			}
    	],
  },
  plugins: [
    	new webpack.NamedModulesPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
    	new ManifestPlugin(),
  ],
  resolveLoader: {
  	alias: {
  		'my-loader': path.resolve(__dirname, 'loaders/my-loader.js')
  	}
  }
}