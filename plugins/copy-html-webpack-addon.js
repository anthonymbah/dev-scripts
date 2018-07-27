const path = require('path');
const fs = require('fs');
const SRC = path.resolve(__dirname, '../src');
const DIST = path.resolve(__dirname, '../dist/');

const convertToArray = obj => 
      Object.keys(obj).map(m => ({ key: m, value: obj[m] }));

const getAssets = m => convertToArray(m);

const getFiles = () => fs.readdirSync(SRC, {encoding: 'utf8'})
                         .filter(f => f.includes('.html'));

const transform = (name, assets) => {

    return new Promise((resolve, reject) => { 
      fs.readFile(`${SRC}/${name}`, 'utf8', (err, content) => {
        if(err) { 
          reject(err) 
        } else {
          for(let a of assets){
            content = content.replace(a.key, a.value);
          }

        fs.writeFile(`${DIST}/${name}`, content, 'utf8', err => {
          if(err) { 
            reject(err) 
          } else {
             resolve();
          }
        });
      }
    });
  });
};

const logIt = ({debug, k, v}) => {
  if(debug){
    console.log('copy-html-webpack-addon:', k, '->' , v);
  }
};

module.exports = ({ manifest, debug }) => { 
  console.log('copy-html-webpack-addon: started.');
  logIt({debug, k: 'manifest file', v: manifest});
  const assets = getAssets(manifest);
  logIt({debug, k: 'assets', v: assets});
  const files = getFiles();
  logIt({debug, k: 'files', v: files});
  const promises = files.map(f => transform(f, assets));
  Promise.all(promises)
         .then(() => console.log('copy-html-webpack-addon: finished.'))
         .catch(err => console.log(err));
  ;
};