# Build Automation Tools

### `yarn start` (`start.js`)

- Cleans up the output `/build` directory (`clean.js`)
- Copies static files to the output folder (`copy.js`)
- Compiles source files to the output folder (`compile.js`)
- Launches Node.js server from the compiled output folder (`start.js`)

### `yarn run build` (`build.js`)

- Cleans up the output `/build` folder (`clean.js`)
- Copies static files to the output folder (`copy.js`)
- Compiles source files with Babel (`compile.js`)

### `yarn run deploy` (`deploy.js`)

- Builds the project from source files (`build.js`)
- Pushes the contents of the `/build` folder to a remote server with Git

## Options

| Flag        | Description                                 |
| ----------- | ------------------------------------------- |
| `--release` | Minimizes and optimizes the compiled output |
| `--verbose` | Prints detailed information to the console  |
| `--docker`  | Build an image from a Dockerfile            |

For example:

```sh
$ yarn run build --release --verbose      # Build the app in production mode
```

or

```sh
$ yarn start --release                    # Launch dev server in production mode
```

## Misc

- `run.js` - Helps to launch other scripts with `babel-node` (e.g. `babel-node tools/run build`)
- `.eslintrc` - ESLint overrides for built automation scripts
