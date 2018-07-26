const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyHtmlWebpackPlugin = require('./plugins/copy-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DIST = 'dist';

var options = {
	resources: [
		`${path.resolve(__dirname, 'dist')}/manifest.json`,
	],
	delay: 1000, // initial delay in ms, default 0
	interval: 100, // poll interval in ms, default 250ms
	timeout: 5000, // timeout in ms, default Infinity
	window: 1000, // stabilization time in ms, default 750ms   
  };

let manifest = null;
const transform = content => {
	// console.log(__dirname);
	//manifest = manifest || require('./dist/manifest.json'); 
	// console.log(context);
	return new Promise((resolve, reject) => {
			// manifest = manifest || require('./dist/manifest.json'); 
				resolve(content.toString());
	});
	// return content.toString();
};
const pattens = [{ 
	flatten: true,
	from: 'src/*.html', 
	transform,
}];

module.exports = {
	entry: { app: './src/app.js'},
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
	    new CleanWebpackPlugin(['dist/*.*']),
    	new webpack.NamedModulesPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
		new ManifestPlugin(),
		new CopyWebpackPlugin(pattens, { debug: false }),
		new CopyHtmlWebpackPlugin(),
  ],
  resolveLoader: {
  	alias: {
  		'my-loader': path.resolve(__dirname, 'loaders/my-loader.js')
  	}
  }
}