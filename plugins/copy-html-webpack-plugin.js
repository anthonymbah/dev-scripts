const copy = require('recursive-copy');
const path = require('path');
const through = require('through2');
 
const options = {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
    filter: [
        '../src/*.html',
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
        const manifest = require('../dist/manifest.json');
        console.log('MANIFEST', manifest);

        copy('src', 'dist', options)
    .on(copy.events.COPY_FILE_START, function(copyOperation) {
        console.info('Copying file ' + copyOperation.src + '...');
    })
    .on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
        console.info('Copied to ' + copyOperation.dest);
    })
    .on(copy.events.ERROR, function(error, copyOperation) {
        console.error('Unable to copy ' + copyOperation.dest);
    })
    .then(function(results) {
        console.info(results.length + ' file(s) copied');
    })
    .catch(function(error) {
        return console.error('Copy failed: ' + error);
    });

      });
    }
  }
  
  module.exports = CopyHtmlWebpackPlugin;