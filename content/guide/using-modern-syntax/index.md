---
title: Modern syntax
date: 2020-03-08 23:31:12+0800
sidebar:
  match: /guide/
  order: 1
---

A userscript runs in a browser, so it can only contain syntax that is supported by the browser.

Violentmonkey itself is built for modern browsers, to be precise, for Chrome >= 55 and Firefox >= 53. So if your browser has Violentmonkey, it is likely it also supports many ES6 features natively, for example, arrow functions (`=>`), Promises, block-scoped variables, template literals (`` `hello, ${name}` ``), etc.

However, there are many more cool features that are not fully supported by browsers, or some features such as TypeScript and ES modules that won't be supported in userscripts natively.

In this tutorial we are going to create a project to compile ESNext and other modern syntax to browser compliant code.

## Prerequisites

- Make sure you have Node.js >= v12 installed.

## Initialization

Create a new directory for your script:

```bash
$ mkdir my-script
$ cd my-script
```

Thanks to `npx`, we can generate the new project with a one-line command:

```bash
$ npx -p github:violentmonkey/generator-userscript -p yo yo @violentmonkey/userscript
```

Under the hood, we use Yeoman to create a project with JavaScript toolchain, compiling source code with Babel, and bundling them with Rollup. See [generator-userscript](https://github.com/violentmonkey/generator-userscript) for more details.

## Development

Now we should get a project with following structure:

```text
├── dist
├── src
│  ├── app.js
│  ├── index.js
│  ├── meta.js
│  └── style.module.css
├── babel.config.js
├── .eslintrc.js
├── package.json
└── README.md
```

Source code files are kept in `src`, and will be compiled to `dist/index.user.js`.

`src/meta.js` contains the metadata of our script, see [Metadata Block](/api/metadata-block/) for more details.

`src/index.js` is the entrance of our script, other files in `src` can be imported.

### Compiling and Watching

```bash
$ npm run dev
```

Source code will be watched by the compiler and compiled to `dist` once changed.

By installing the compiled userscript from `dist`, we can test and keep up with the latest code of our userscript. See also [How to edit scripts with your favorite editor](/posts/how-to-edit-scripts-with-your-favorite-editor/).

### Building

```bash
$ npm run build
```

In this way the source code will be compiled exactly once, and saved in `dist`.

The version and author of our userscript will be synced with that in `package.json`.

## Features

With Babel and plenty of plugins, we can easily use cool ESNext features. All features included in [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) are supported.

### JSX

[JSX](https://facebook.github.io/jsx/) is usually bound with React, compiled to React Nodes. However, we can port the syntax to DOM and facilitate DOM operations, which is exactly what [@violentmonkey/dom](https://github.com/violentmonkey/vm-dom) does.

To use JSX, we need to require a JSX runtime first. Add this in `src/meta.js`:

```js {3}
// ==UserScript==
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==
```

Then we can operate DOM elements easily:

```js
document.body.append(VM.m(<div>hello, world</div>));
```

Note that `VM.m` is required to transform virtual DOM to real DOM elements. See [documentation](https://violentmonkey.github.io/vm-dom/) for more details.

### CSS

CSS in this project will be handled by [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss), enhanced by [Tailwind CSS](https://tailwindcss.com/) which will be discussed later.

Compiled CSS string can be imported:

```js
// global CSS
import globalCss from './style.css';

const style = document.createElement('style');
style.textContent = globalCss;
document.head.append(style);

// or use with JSX
document.head.append(VM.m(<style>{globalCss}</style>));
```

### CSS Modules

CSS modules is enabled automatically for `src/**/*.module.css`. When importing from a `.module.css` file, we get an object as default export, mapping from original class names to hashed class names. The CSS string is imported from a named export `stylesheet`.

```js
// CSS modules
import styles, { stylesheet } from './style.module.css';

document.head.append(VM.m(<style>{stylesheet}</style>));
document.body.append(VM.m(<div className={styles.container}>hello, world</div>));
```

```css
/* style.module.css */
.container {
  padding: 8px;
}
```

### Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is enabled by default, so you can easily compose tailwindcss utilities to build your own CSS.

```css
body {
  @apply bg-gray-200;
}
```

However, we are building a userscript which should not pollute the global context too much, so we should only use Tailwind CSS directives in CSS, but not as classes directly in JavaScript or HTML templates.

## Recap

Thanks to Babel and Rollup, we can use a lot of modern features in a userscript:

- ESNext features
- React-like JSX syntax
- CSS modules
- Tailwind CSS
