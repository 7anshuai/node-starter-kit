#!/usr/bin/env node

import cp from 'child_process';
import clean from './clean';
import compile from './compile';
import run from './run';
import pkg from '../package.json';

let server;
let debugPort = '9230';

const serverQueue = [];
const isDebug = process.execArgv.some(x => x.startsWith('--inspect'));

// Gracefull shutdown
process.once('cleanup', () => {
  if (server) {
    server.addListener('exit', () => process.exit());
    server.kill('SIGTERM');
    serverQueue.forEach(x => x.kill());
  } else {
    process.exit();
  }
});
process.on('SIGINT', () => process.emit('cleanup'));
process.on('SIGTERM', () => process.emit('cleanup'));

// Install Node.js modules with Yarn
cp.spawnSync('yarn', ['install', '--no-progress'], { stdio: 'inherit' });

// Launch `node build/server.js` on a background thread
function spawnServer() {
  return cp.spawn(
    'node',
    [
      // Pre-load application dependencies to improve "hot reload" restart time
      ...Object.keys(pkg.dependencies).reduce(
        (requires, val) => requires.concat(['--require', val]),
        [],
      ),
      '--nolazy',
      // If the parent Node.js process is running in debug (inspect) mode,
      // launch a debugger for Express.js app on the next port
      ...process.execArgv
        .filter(arg => arg.startsWith('--inspect'))
        .map(arg => {
          const match = arg.match(/^--inspect=(\S+:|)(\d+)$/);
          if (match) debugPort = Number(match[2]) + 1;
          return `--inspect=${match ? match[1] : '0.0.0.0:'}${debugPort}`;
        }),
      ...process.execArgv.filter(arg => !arg.startsWith('--inspect')),
      // Enable "hot reload", it only works when debugger is off
      ...(isDebug
        ? ['./build/server.js']
        : [
            '--eval',
            'process.stdin.on("data", data => { if (data.toString() === "load") require("./build/server.js"); });',
          ]),
    ],
    { stdio: ['pipe', 'inherit', 'inherit'], timeout: 3000 },
  );
}

function start() {
  return (
    Promise.resolve()
      .then(() => run(clean))
      // Compile and launch the app in watch mode, restart it after each rebuild
      .then(() =>
        run(compile, {
          watch: true,
          onComplete() {
            if (isDebug) {
              if (server) {
                server.on('exit', () => {
                  server = spawnServer();
                });
                server.kill('SIGTERM');
              } else {
                server = spawnServer();
              }
            } else {
              if (server) server.kill('SIGTERM');
              server = serverQueue.splice(0, 1)[0] || spawnServer();
              server.stdin.write('load'); // this works faster than IPC
              if (server)
                while (serverQueue.length < 3) serverQueue.push(spawnServer());
            }
          },
        }),
      )
      // Resolve the promise on exit
      .then(
        () =>
          new Promise(resolve => {
            process.once('exit', () => {
              if (server) server.kill();
              resolve();
            });
          }),
      )
  );
}

export default start;
