import { writeFile, copyFile, makeDir } from './fs';
import pkg from '../package.json';

/**
 * Copies package.json, yarn.lock to the
 * output (build) folder.
 */
async function copy() {
  await makeDir('build');
  await Promise.all([
    writeFile(
      'build/package.json',
      JSON.stringify(
        {
          private: true,
          engines: pkg.engines,
          dependencies: pkg.dependencies,
          scripts: {
            start: 'node server.js',
          },
        },
        null,
        2,
      ),
    ),
    copyFile('yarn.lock', 'build/yarn.lock'),
  ]);
}

export default copy;
