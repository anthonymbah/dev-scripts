const copy = require('recursive-copy');
const path = require('path');
const through = require('through2');
const manifest = require('../dist/manifest.json');
 
const options = {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
    filter: [
        'src/*.html',
        '!.htpasswd'
    ],
    rename: function(filePath) {
        return filePath + '.orig';
    },
    transform: function(src, dest, stats) {
        if (path.extname(src) !== '.html') { return null; }
        return through(function(chunk, enc, done)  {
            const output = chunk.toString().toUpperCase();
            done(null, output);
        });
    }
};
 



class CopyHtmlWebpackPlugin {
    constructor(options) {
      this.options = options;
    }
  
    apply(compiler) {

        
      compiler.hooks.done.tap('CopyHtmlWebpackPlugin', () => {
        console.log('Hello World!');
        console.log(manifest['app.js']);
        

      });

      compiler.hooks.emit.tapPromise('HelloAsyncPlugin', (compilation) => {
        return new Promise((resovle, reject) => {
            resolve();
        })
          .then(() => {
            console.log('Done with async work...');
          });
      });
    }
  }
  
  module.exports = CopyHtmlWebpackPlugin;