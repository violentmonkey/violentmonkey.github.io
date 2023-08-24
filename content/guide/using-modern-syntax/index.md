---
title: Modern Syntax
date: 2023-08-23 23:31:12+0800
sidebar:
  match: /guide/
  order: 1
---

Violentmonkey itself is built for modern browsers, to be precise, for Chrome >= 57 and Firefox >= 57. So if your browser has Violentmonkey, it is likely it also supports many ES6 features natively, for example, async / await, block-scoped variables, etc.

However, there are many more cool features that are not fully supported by browsers, or some features such as TypeScript and ES modules that won't be supported in userscripts natively.

In this tutorial we are going to create a project to compile ESNext and other modern syntax to browser compliant code.

## Prerequisites

- Node >= 18
- NPM >= 8.15.0

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

Under the hood, we use Yeoman to create a project with JavaScript toolchain, compiling source code with Babel, and bundling them with Rollup. See the source code at [GitHub](https://github.com/violentmonkey/generator-userscript).

Now we should get a project with the following structure:

```text
├── dist
├── src
│  ├── app.tsx
│  ├── index.ts
│  ├── meta.js
│  ├── style.css
│  └── style.module.css
├── babel.config.js
├── package.json
├── postcss.config.cjs
├── rollup.config.mjs
├── tsconfig.json
├── uno.config.ts
└── README.md
```

Source code files are kept in `src`, and will be compiled to `dist/index.user.js`.

`src/meta.js` contains the metadata of our script, see [Metadata Block](/api/metadata-block/) for more details. Do not add actual code to this file.

`src/index.ts` is the entrance of our script, other files in `src` can be imported.

### Development

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

We have quite a few lovely features enabled by default:

- TypeScript
- CSS modules (applied to files ending with `.module.css`)
- [UnoCSS](https://unocss.dev/)
- [SolidJS](https://www.solidjs.com/)

Of course you don't have to use all these features. If you don't like them, you can simply ignore them or opt out by removing the plugins.

To learn more about each feature, check [Features in Userscript Generator](/posts/features-in-userscript-generator/).
