const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultPluginOpts = {
	template: 'html/template.html',
	title: 'Not Set',
	inject: false,
	site: 'Not Set',
	root: 'dist/',
	filename: 'Not-Set.html',
	metaTags: [{
		key: 'viewport',
		value: 'width=device-width, initial-scale=1, shrink-to-fit=no',
	},
	{
		key: 'theme-color',
		value: '#ffffff',
	}
	],
	minify: {
		collapseWhitespace: true,
		removeComments: true,
	}
};

const sites = [
	{ name: 'app', title: 'MY APP', filename: 'App.html' },
	{ name: 'page', title: 'MY PAGE', filename: 'Page.html' },
];

module.exports = () => {
	return sites.map(s => {
		const options = {
			title: s.title,
			site: s.name,
			filename: s.filename,
		};

		return new HtmlWebpackPlugin(Object.assign(defaultPluginOpts, options));
	});
};