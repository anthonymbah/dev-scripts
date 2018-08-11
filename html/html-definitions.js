const HtmlWebpackPlugin = require('html-webpack-plugin');
const NOT_SET = 'Not-Set';

const defaultPluginOpts = {
	template: 'html/template.html',
	title: NOT_SET,
	inject: false,
	site: NOT_SET,
	filename: `${NOT_SET}.html`,
	metaTags: [{
		key: 'viewport',
		value: 'width=device-width, initial-scale=1, shrink-to-fit=no',
	}],
	minify: {
		collapseWhitespace: true,
		removeComments: true,
	}
};

const defaultSites = [
	{ name: 'app', title: 'MY APP', filename: 'App.html' },
	{ name: 'page', title: 'MY PAGE', filename: 'Page.html' },
];

module.exports = ({
	publicPath = 'dist/',
	sites = defaultSites,
	donotMinify = false
}) => {
	defaultPluginOpts.publicPath = publicPath;

	if(donotMinify){
		delete defaultPluginOpts.minify;
	}

	return sites.map(s => {
		const options = {
			title: s.title,
			site: s.name,
			filename: s.filename,
		};

		return new HtmlWebpackPlugin(
			Object.assign(defaultPluginOpts, options)
		);
	});
};