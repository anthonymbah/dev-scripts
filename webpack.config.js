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
const copyHtmlWebpackAddon = require('./add-ons/copy-html-webpack-addon');

const serialize = manifest => { 
	copyHtmlWebpackAddon({ 
		manifest, 
		debug: false,
		src: 'src/*.html',
		dist: path.resolve(__dirname, 'dist'),
	});
	return JSON.stringify(manifest, null, 2);
};
const pattens = [{ 
	flatten: true,
	from: 'src/*.jpg', 
}];

module.exports = {
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
				test: /\.html$/,
				use: ['my-loader']
			}
		],},
	plugins: [
		new CleanWebpackPlugin(['dist/**/*.*']),
		new NamedModulesPlugin(),
		new HotModuleReplacementPlugin(),
		new ManifestPlugin({ writeToFileEmit: true, serialize }),
		new CopyWebpackPlugin(pattens, { debug: false }),
	],
	resolveLoader: {
		alias: {
			'my-loader': path.resolve(__dirname, 'loaders/my-loader.js')
		}
	}
};