<div align="center">
<br>
<img src="https://user-images.githubusercontent.com/12294525/44203609-77d50800-a147-11e8-98f0-f2403527abdc.png" width="600px" />

</div>

<br>

<p align="center">
A boilerplate for Scalable Cross-Platform Desktop Apps based on  <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).
</p>

<div align="center">
<br>
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/for-you.svg" />
</div>

<br>

<div align="center">

<a href="https://facebook.github.io/react/"><img src="./internals/img/react-padded-90.png" /></a>
<a href="https://webpack.github.io/"><img src="./internals/img/webpack-padded-90.png" /></a>
<a href="http://redux.js.org/"><img src="./internals/img/redux-padded-90.png" /></a>
<a href="https://github.com/ReactTraining/react-router"><img src="./internals/img/react-router-padded-90.png" /></a>
<a href="https://flowtype.org/"><img src="./internals/img/flow-padded-90.png" /></a>
<a href="http://eslint.org/"><img src="./internals/img/eslint-padded-90.png" /></a>
<a href="https://facebook.github.io/jest/"><img src="./internals/img/jest-padded-90.png" /></a>
<a href="https://yarnpkg.com/"><img src="./internals/img/yarn-padded-90.png" /></a>

</div>

<hr>
<br>

<div align="center">

[![Build Status][travis-image]][travis-url]
[![Appveyor Build Status][appveyor-image]][appveyor-url]
[![Dependency Status][david_img]][david_site]
[![DevDependency Status][david_img_dev]][david_site_dev]
[![Github Tag][github-tag-image]][github-tag-url]
[![Join the chat at https://gitter.im/tron-app/Lobby](https://badges.gitter.im/tron-app/Lobby.svg)](https://gitter.im/tron-app/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![OpenCollective](https://opencollective.com/tron-app/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/tron-app/sponsors/badge.svg)](#sponsors)

</div>

<div align="center">

![Electron Boilerplate Demo](https://cloud.githubusercontent.com/assets/3382565/10557547/b1f07a4e-74e3-11e5-8d27-79ab6947d429.gif)

</div>

## Install

-   **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/tron-app/tron-app/issues/400)**

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/tron-app/tron-app.git your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

To run End-to-End Test

```bash
$ yarn build-e2e
$ yarn test-e2e

# Running e2e tests in a minimized window
$ START_MINIMIZED=true yarn build-e2e
$ yarn test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## CSS Modules

This boilerplate is configured to use [css-modules](https://github.com/css-modules/css-modules) out of the box.

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import "~bootstrap/dist/css/bootstrap.css";
```

## SASS support

If you want to use Sass in your app, you only need to import `.sass` files instead of `.css` once:

```js
import "./app.global.scss";
```

## Static Type Checking

This project comes with Flow support out of the box! You can annotate your code with types, [get Flow errors as ESLint errors](https://github.com/amilajack/eslint-plugin-flowtype-errors), and get [type errors during runtime](https://github.com/codemix/flow-runtime) during development. Types are completely optional.

## Dispatching redux actions from main process

See [#118](https://github.com/tron-app/tron-app/issues/118) and [#108](https://github.com/tron-app/tron-app/issues/108)

## How to keep your project updated with the boilerplate

If your application is a fork from this repo, you can add this repo to another git remote:

```sh
git remote add upstream https://github.com/tron-app/tron-app.git
```

Then, use git to merge some latest commits:

```sh
git pull upstream master
```

## Maintainers

-   [Vikram Rangaraj](https://github.com/vikr01)
-   [Amila Welihinda](https://github.com/amilajack)
-   [C. T. Lin](https://github.com/chentsulin)
-   [Jhen-Jie Hong](https://github.com/jhen0409)

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/tron-app#backer)]

<a href="https://opencollective.com/tron-app/backer/0/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/1/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/2/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/3/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/4/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/5/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/6/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/7/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/8/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/9/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/10/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/11/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/12/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/13/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/14/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/15/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/16/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/17/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/18/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/19/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/20/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/21/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/22/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/23/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/24/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/25/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/26/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/27/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/28/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/backer/29/website" target="_blank"><img src="https://opencollective.com/tron-app/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/tron-app#sponsor)]

<a href="https://opencollective.com/tron-app/sponsor/0/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/1/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/2/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/3/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/4/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/5/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/6/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/7/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/8/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/9/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/10/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/11/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/12/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/13/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/14/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/15/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/16/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/17/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/18/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/19/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/20/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/21/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/22/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/23/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/24/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/25/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/26/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/27/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/28/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/tron-app/sponsor/29/website" target="_blank"><img src="https://opencollective.com/tron-app/sponsor/29/avatar.svg"></a>

## License

MIT © [Electron React Boilerplate](https://github.com/tron-app)

[npm-image]: https://img.shields.io/npm/v/tron-app.svg?style=flat-square
[github-tag-image]: https://img.shields.io/github/tag/tron-app/tron-app.svg
[github-tag-url]: https://github.com/tron-app/tron-app/releases/latest
[travis-image]: https://travis-ci.com/tron-app/tron-app.svg?branch=master
[travis-url]: https://travis-ci.com/tron-app/tron-app
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/tron-app/tron-app?svg=true
[appveyor-url]: https://ci.appveyor.com/project/tron-app/tron-app/branch/master
[david_img]: https://img.shields.io/david/tron-app/tron-app.svg
[david_site]: https://david-dm.org/tron-app/tron-app
[david_img_dev]: https://david-dm.org/tron-app/tron-app/dev-status.svg
[david_site_dev]: https://david-dm.org/tron-app/tron-app?type=dev
