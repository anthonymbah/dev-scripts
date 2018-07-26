const path = require('path');
const fs = require('fs');
const distPath = path.resolve(__dirname, '../dist');
const options = {
    encoding: 'utf8',
};
const convertToArray = obj => 
      Object.keys(obj).map(m => ({ key: m, value: obj[m] }));

const getAssets = () => {
  const manifest = require('../dist/manifest.json');
  return convertToArray(manifest);   
}

const getFiles = () => fs.readdirSync(distPath, options)
                         .filter(f => f.includes('.html'));

const transformP = (path, assets) => {

    return new Promise((resolve, reject) => { 
      let content = fs.readFile(path, 'utf8', (err, content) => {
        if(err) { 
          reject(err) 
        } else {
          for(let a of assets){
            content = content.replace(a.key, a.value);
          }

        fs.writeFile(path, content, 'utf8', err => {
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

class CopyHtmlWebpackPlugin {
    constructor(options) {
      this.options = options;
    }
  
    apply(compiler) {
        
      compiler.hooks.done.tapAsync('CopyHtmlWebpackPlugin', () => {
        
        const assets = getAssets();
        const promises = getFiles().map(f => transformP(`${distPath}/${f}`, assets));
        Promise.all(promises).then(() => console.log('Html Asserts includes completed.'));
      });
    }
  }
  
  module.exports = CopyHtmlWebpackPlugin;