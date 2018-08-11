/*global __dirname*/

const path = require('path');
const webpack = require('webpack');
const {
	NamedModulesPlugin,
	HotModuleReplacementPlugin,
} = webpack;
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlDefinitions = require('./html/html-definitions');

const config = {
	entry: { app: './src/app.js', page: './src/page.js'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
		//publicPath: '/dist/',
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		watchContentBase: false,
		// hotOnly: true,
		hot: false,
		//publicPath: '/dist/',
	},module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{ loader: 'babel-loader' }]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader'
				]
			},
		],},
	plugins: [
		new CleanWebpackPlugin(['dist/**/*.*']),
		new NamedModulesPlugin(),
		new HotModuleReplacementPlugin(),
		new ManifestPlugin({ writeToFileEmit: true }),
		new CopyWebpackPlugin([{ flatten: true, from: 'src/*.jpg',}], { debug: false }),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		}),
	],
	resolveLoader: {
		alias: {
			'my-loader': path.resolve(__dirname, 'loaders/my-loader.js')
		}
	}
};

config.plugins.push(...htmlDefinitions({}));

module.exports = config;