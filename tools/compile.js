#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const chokidar = require('chokidar');

const isWatch = process.argv.includes('--watch');

const delay100ms = (timeout => callback => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(callback, 100); // eslint-disable-line no-param-reassign
})();

function compile({ watch = isWatch, onComplete } = {}) {
  return new Promise(resolve => {
    let ready = false;
    let watcher = chokidar.watch(['src', 'package.json', 'yarn.lock']);
    watcher.on('all', (event, src) => {
      // Reload the app if package.json or yarn.lock files have changed (in watch mode)
      if (src === 'package.json' || src === 'yarn.lock') {
        if (ready && onComplete) delay100ms(onComplete);
        return;
      }

      if (
        path.basename(src)[0] === '.' ||
        src.includes('__tests__') ||
        src.endsWith('.test.js')
      ) {
        return;
      }

      // Get destination file name, e.g. src/app.js (src) -> build/app.js (dest)
      const dest = src.startsWith('src')
        ? `build/${path.relative('src', src)}`
        : `build/${src}`;

      try {
        switch (event) {
          // Create a directory if it doesn't exist
          case 'addDir':
            if (src.startsWith('src') && !fs.existsSync(dest))
              fs.mkdirSync(dest);
            if (ready && onComplete) onComplete();
            break;

          // Create or update a file inside the output (build) folder
          case 'add':
          case 'change':
            if (src.startsWith('src') && src.endsWith('.js')) {
              const { code, map } = babel.transformFileSync(src, {
                sourceMaps: true,
                sourceFileName: path.relative(
                  path.dirname(`build${src.substr(3)}`),
                  src,
                ),
              });
              // Enable source maps
              const data =
                (src === 'src/server.js'
                  ? "require('source-map-support').install(); "
                  : '') +
                code +
                (map
                  ? `\n//# sourceMappingURL=${path.basename(src)}.map\n`
                  : '');
              fs.writeFileSync(dest, data, 'utf8');
              console.log(src, '->', dest);
              if (map)
                fs.writeFileSync(`${dest}.map`, JSON.stringify(map), 'utf8');
            } else if (src.startsWith('src')) {
              const data = fs.readFileSync(src, 'utf8');
              fs.writeFileSync(dest, data, 'utf8');
              console.log(src, '->', dest);
            }
            if (ready && onComplete) delay100ms(onComplete);
            break;

          // Remove directory if it was removed from the source folder
          case 'unlinkDir':
            if (fs.existsSync(dest)) fs.rmdirSync(dest);
            if (ready && onComplete) onComplete();
            break;

          default:
          // Skip
        }
      } catch (err) {
        console.log(err.message);
      }
    });

    watcher.on('ready', () => {
      ready = true;
      if (onComplete) onComplete();
      if (!watch) watcher.close();
      resolve();
    });

    function cleanup() {
      if (watcher) {
        watcher.close();
        watcher = null;
      }
    }

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('exit', cleanup);
  });
}

export default compile;
