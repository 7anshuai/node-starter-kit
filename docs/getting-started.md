## Getting Started

### Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v8.16.2 or
  newer
- Text editor or IDE pre-configured with Flow/ESlint
  ([learn more](./how-to-configure-text-editors.md))

### Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /data/                  # GraphQL server schema and data models
│   ├── /config.js              # Global application settings
│   ├── /server.js              # Server startup script
│   └── ...                     # Other core framework modules
├── /test/                      # Unit tests
├── /tools/                     # Build automation scripts and utilities
│   ├── /fs.js                  # File system utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /compile.js             # Compiles source files with Babel
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /deploy.js              # Deploys your web application
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /start.js               # Launches the development web server with "live reload"
├── Dockerfile                  # Commands for building a Docker image for production
├── package.json                # The list of 3rd party libraries and utilities
└── yarn.lock                   # Fixed versions of all the dependencies
```

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of Node Starter Kit on your
local machine by running:

```shell
$ git clone -o node-starter-kit -b master --single-branch https://github.com/7anshuai/node-starter-kit.git MyApp
$ cd MyApp
```

#### 2. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 3. Run `yarn start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, it will start the
Node.js server (`node build/server.js`) on top of it.

> [http://localhost:3000/](http://localhost:3000/) — Node.js server\
> [http://localhost:3000/graphql](http://localhost:3000/graphql) — GraphQL server and IDE

Now you can open your app in a browser and start hacking.

### How to Build, Test, Deploy

If you need just to build the app, simply run:

```shell
$ yarn run build
```

or, for a production build:

```shell
$ yarn run build --release
```

or, for a production docker build:

```shell
$ yarn run build --release --docker
```

_NOTE: double dashes are required_

After running this command, the `/build` folder will contain the compiled
version of the app. For example, you can launch Node.js server normally by
running `node build/server.js`.

To check the source code for syntax errors and potential issues run:

```shell
$ yarn run lint
```

To launch unit tests:

```shell
$ yarn run test          # Run unit tests with Jest
$ yarn run test-watch    # Launch unit test runner and start watching for changes
```

By default, [Jest](https://jestjs.io/) test runner is looking for test files
matching the `src/**/*.test.js` pattern.

To deploy the app, run:

```shell
$ yarn run deploy
```

The deployment script `tools/deploy.js` is configured to push the contents of
the `/build` folder to a remote server via Git. You can easily deploy your app
to
[Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/),
or [Heroku](https://www.heroku.com/) this way. Both will execute `yarn install --production` upon receiving new files from you. Note, you should only deploy
the contents of the `/build` folder to a remote server.

### How to Update

If you need to keep your project up to date with the recent changes made to this repo,
you can always fetch and merge them from
[this repo](https://github.com/7anshuai/node-starter-kit) back into your own
project by running:

```shell
$ git checkout master
$ git fetch node-starter-kit
$ git merge node-starter-kit/master
$ yarn install
```
