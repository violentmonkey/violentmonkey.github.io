---
title: How to use modern syntax in a userscript
date: 2020-03-08 23:31:12+0800
sidebar:
  match: /guide/
  order: 1
---

A userscript runs in a browser, so it can only contain syntax that is supported by the browser.

Violentmonkey itself is built for modern browsers, to be precise, for Chrome >= 55 and Firefox >= 53. So if your browser has Violentmonkey, it is likely it also supports many ES6 features natively, for example, arrow functions (`=>`), Promises, block-scoped variables, template literals (`` `hello, ${name}` ``), etc.

However, there are many more cool features that are not fully supported by browsers, e.g. optional chaining.

In this tutorial we are going to create a project to compile ESNext and other modern syntax to browser compliant code.

## Prequisite

- Make sure you have Node.js >= v10.0 installed.

## Initialization

Thanks to `npx`, we can generate the new project with a one-line command:

```bash
$ mkdir my-script
$ cd my-script
$ npx -p https://github.com/violentmonkey/generator-userscript.git -p yo yo @violentmonkey/userscript
```

Under the hood, we are using Yeoman to create a project with JavaScript toolchain, compiling source code with Babel, and bundling them with Rollup.

## Development

Now we should get a project with following structure:

```
├── dist
├── src
│  ├── app.js
│  ├── index.js
│  ├── meta.js
│  └── style.module.css
├── .babelrc.js
├── .eslintrc.js
├── package.json
└── README.md
```

Source code files are kept in `src`, and will be compiled to `dist/index.user.js`.

`src/meta.js` contains the metadata of our script, see [Metadata Block](/api/metadata-block/) for more details.

`src/index.js` is the entrance of our script, other files in `src` can be imported.

### Compiling and Watching

```bash
$ yarn dev
# or
$ npm run dev
```

Source code will be watched by the compiler and compiled to `dist` once changed.

By installing the compiled userscript from `dist`, we can test and keep up with the latest code of our userscript. See also [How to edit scripts with your favorite editor](/posts/how-to-edit-scripts-with-your-favorite-editor/).

### Building

```bash
$ yarn build
# or
$ npm run build
```

In this way the source code will be compiled exactly once, and saved in `dist`.

The version of our userscript will be synced with that in `package.json`.

## Features

With Babel and plenty of plugins, we can easily use cool ESNext features. All features included in [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) are supported.

### JSX

[JSX](https://facebook.github.io/jsx/) is usually bound with React, compiled to React Nodes. However, we can port the syntax to DOM and simplify our DOM operations, which is exactly what [@violentmonkey/dom](https://github.com/violentmonkey/vm-dom) does.

To use JSX, we need to require a JSX runtime first. Add this in `src/meta.js`:

```js
// ==UserScript==
// ...
// highlight-next-line
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// ==/UserScript==
```

Then we can operate DOM elements easily:

```js
document.body.append(<div>hello, world</div>);
```

### CSS

CSS in this project will be handled by [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss), enhanced by [PreCSS](https://github.com/jonathantneal/precss). In other words, Sass-like markup and staged CSS features are supported in `src/**/*.css`.

Compiled CSS string can be imported:

```js
// global CSS
import globalCss from './style.css';

const style = document.createElement('style');
style.textContent = globalCss;
document.head.append(style);

// or use with JSX
document.head.append(<style>{globalCss}</style>);
```

### CSS Modules

CSS modules is enabled automatically for `src/**/*.module.css`. When importing from a `.module.css` file, we get an object as default export, mapping from original class names to hashed class names. The CSS string is imported from a named export `stylesheet`.

```js
// CSS modules
import styles, { stylesheet } from './style.module.css';

document.head.append(<style>{stylesheet}</style>);
document.body.append(<div className={styles.container}>hello, world</div>);
```

```css
/* style.module.css */
.container {
  padding: 8px;
}
```

### TailwindCSS

[TailwindCSS](https://tailwindcss.com/) is enabled by default, so you can easily compose classes to build your own CSS.

```css
body {
  @apply bg-gray-200;
}
```

However, we are building a userscript which should not pollute the global context too much, so we should not use TailwindCSS classes directly in JavaScript or HTML templates.

## Recap

Thanks to Babel and Rollup, we can use a lot of modern features in a userscript:

- ESNext features
- React-like JSX syntax
- Sass-like CSS features
- CSS modules
- TailwindCSS
