const { 
	readFile, 
	writeFile  
} = require('fs');
const gloppy = require('globby');

const convertToArray = obj => Object.keys(obj).map(m => ({ key: m, value: obj[m] }));

const getAssets = m => convertToArray(m);

const getFiles = ({src, dist}) => gloppy.sync([src], 
	{ 
		transform: entry => { 
			const name = entry.split('/').reverse()[0];
			return { 
				dist: `${dist}/${name}`,
				entry, 
			};
		}
	}
);

const transform = ({ file, assets}) => new Promise((resolve, reject) => {
	const { entry, dist } = file;
	readFile(entry, 'utf8', (readErr, content) => {
		if (readErr) {
			reject(readErr);
		} else {
			for (const a of assets) {
				content = content.replace(a.key, a.value);
			}

			writeFile(dist, content, 'utf8', err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		}
	});
});

const logIt = ({ debug, k = '#', v = '' }) => {
	if (debug) {
		console.log('copy-html-webpack-addon:', k, '->', v);
	}
};

module.exports = ({ manifest, debug, src, dist }) => {
	logIt({debug: true, v: 'started.'});
	logIt({debug: true, k: 'src', v: src});
	logIt({debug: true, k: 'dist', v: dist});
	logIt({ debug, k: 'manifest file', v: manifest });
	const assets = getAssets(manifest);
	logIt({ debug, k: 'assets', v: assets });
	const files = getFiles({src,dist});
	logIt({ debug, k: 'files', v: files });
	const promises = files.map(file => transform({file, assets}));
	Promise.all(promises)
		.then(() => logIt({ debug: true, v: 'finished.'}))
		.catch(err => logIt({ debug: true, k: 'ERR', v: err}));
};
