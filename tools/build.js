import cp from 'child_process';
import run from './run';
import clean from './clean';
import copy from './copy';
import compile from './compile';
import pkg from '../package.json';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
  await run(clean);
  await run(copy);
  await run(compile);

  if (process.argv.includes('--docker')) {
    cp.spawnSync('docker', ['build', '-t', pkg.name, '.'], {
      stdio: 'inherit',
    });
  }
}

export default build;
