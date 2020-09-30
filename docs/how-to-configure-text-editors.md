## How to Configure Text Editors and IDEs for Node.js

> Tips and tricks on how to configure your favorite text editor or IDE to work
> with Node.js/ES6+.

### Atom

Install atom packages

- [linter](https://atom.io/packages/linter)
- [linter-eslint](https://atom.io/packages/linter-eslint)

```shell
apm install linter linter-eslint
```

Install local npm packages

- [eslint](https://www.npmjs.com/package/eslint)
- [babel-eslint](https://www.npmjs.com/package/babel-eslint)

```shell
yarn add --dev eslint babel-eslint
```

_You may need to restart atom for changes to take effect_

### SublimeText

Install SublimeText packages\
Easiest with [Package Control](https://packagecontrol.io/) and then "Package Control:
Install Package" (Ctrl+Shift+P)

- [Babel](https://packagecontrol.io/packages/Babel)
- [Flow](https://packagecontrol.io/packages/FlowType)
- [Sublime-linter](http://www.sublimelinter.com/en/latest/)
- [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)

You can also use
[SublimeLinter-contrib-eslint_d](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint_d)
for faster linting.

Set Babel as default syntax for a particular extension:

- Open a file with that extension,
- Select `View` from the menu,
- Then `Syntax` `->` `Open all with current extension as...` `->` `Babel` `->`
  `JavaScript (Babel)`.
- Repeat this for each extension (e.g.: .js and .jsx).

Install local npm packages

```
yarn add --dev eslint@latest
yarn add --dev babel-eslint@latest
```
