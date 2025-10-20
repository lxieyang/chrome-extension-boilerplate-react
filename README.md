# Chrome Extension (MV3) Boilerplate with React and Webpack

![Project icon](src/assets/img/icon-64.png)

[![License][license-image]][license-url]

## Manifest v3

**_This boilerplate adopts [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)!_**

- For Manifest v2 users, check out the [MV3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/).
- This project does not support Manifest v2. But, if absolutely necessary,
  the upstream repository has a [manifest-v2](https://github.com/lxieyang/chrome-extension-boilerplate-react/tree/manifest-v2)
  branch they recommend using.

## Features

This is a basic OS-agnostic Chrome Extensions boilerplate to help you write modular
and modern JavaScript code, load CSS easily and
[automatically reload the browser on code changes](https://webpack.github.io/docs/webpack-dev-server.html#automatic-refresh).

This boilerplate is updated with:

- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [React 19](https://reactjs.org)
- [Webpack 5](https://webpack.js.org/)
- [Webpack Dev Server 4](https://webpack.js.org/configuration/dev-server/)
- [React Refresh](https://www.npmjs.com/package/react-refresh)
- [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [webhint](https://webhint.io/)
- [markdownlint](https://github.com/DavidAnson/markdownlint)

This boilerplate is heavily inspired by and adapted from
[https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate),
with additional support for React 18 features, Webpack 5,
and Webpack Dev Server 4.

## Installing and Running

### Procedures

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `src/manifest.json`.
5. Run `npm install` to install the dependencies.
6. Run `npm start`
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

## Structure

All your extension's code must be placed in the `src` folder.

The boilerplate is already prepared to have a popup, an options page, a
background page, and a new tab page (which replaces the new tab page of your
browser). But feel free to customize these.

## TypeScript

This boilerplate now supports TypeScript! The `Options` Page is implemented
using TypeScript. Please refer to `src/pages/Options/` for example usages.

## Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the
[webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to
development (started with `npm start`) with auto reload feature that reloads
the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var
`port` like this:

Linux:

```shell
PORT=6002 npm start
```

Windows:

```shell
set PORT=6002 && npm start
```

MacOS:

```shell
export PORT=6002 && npm start
```

## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to
write all your bundles files on the disk at every code change, so you can point,
on your extension manifest, to your bundles that you want to use as
[content scripts](https://developer.chrome.com/extensions/content_scripts),
but you need to exclude these entry points from hot reloading
[(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690).
To do so you need to expose which entry points are content scripts in
[`webpack.config.ts`](./webpack/webpack.config.ts)
using the `options.notHotReload` config. See the example below.

Let's say that you want use the `myContentScript` entry point as a content
script, so in your `webpack.config.ts` you will configure the entry point and
exclude it from hot reloading, like so:

<!-- prettier-ignore -->
```js
const config: webpack.Config = {
    // …
    entry: {
        myContentScript: "./src/js/myContentScript.ts"
    },
    // …
};

export const options = {
    notHotReload: ["myContentScript"]
};
```

and in your `src/manifest.json`:

<!-- prettier-ignore -->
```jsonc
{
    // ...
    "content_scripts": [
        {
            "matches": ["https://www.google.com/*"],
            "js": ["myContentScript.bundle.js"]
        }
    ]
    // ...
}
```

## Packing

After the development of your extension run the command

```bash
npm run build
```

Now, the content of the `zip` folder will be the extension ready to be submitted
to the Chrome Web Store. See the [official guide](https://developer.chrome.com/webstore/publish)
for more info about publishing.

## Secrets

If you are developing an extension that talks with some API, you're probably
using different keys for testing and production. It's good practice to not
commit your secrets and expose to anyone that have access to the repository.

To manage your secrets appropriately, create the file `./secrets.<NODE_ENV>.js`
in the top-level directory and import it as `secrets` through import or require.

Example:

_`secrets.development.js`_

```js
export const KEY = '123';
```

_`src/pages/Background/index.js`_

```js
import { KEY } from 'secrets';
// Or, equivalently:
// const require = createRequire(import.meta.url);
// const { KEY } = require('secrets');

CallAPI({ key: KEY });
```

:point_right: `**/secrets.*` is already included in the .gitignore file.

## Resources

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)

## Credits

- Michael Xieyang Liu | [Original repo](https://github.com/lxieyang/chrome-extension-boilerplate-react)
  | [Website](https://lxieyang.github.io)

## Contribution

See the [TODOs](./TODO.md)

[license-image]: https://img.shields.io/github/license/Anonymous-Humanoid/chromium-extension-boilerplate
[license-url]: ./LICENSE.md
