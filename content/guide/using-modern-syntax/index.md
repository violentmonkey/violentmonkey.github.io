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

Under the hood, we use Yeoman to create a project with JavaScript toolchain, compiling source code with Babel, and bundling them with Rollup. See [generator-userscript](https://github.com/violentmonkey/generator-userscript) for more details.

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

### CSS modules

Both global CSS (e.g. `style.css`) and CSS modules (e.g. `style.module.css`) are supported.

A userscript usually works in different websites which may not be maintained by the script developer. So if the script provides independent UI in the website, it must be careful not to break the website and not to be broken by the website. We have two choices, shadow DOM and CSS modules.

- Shadow DOM:
  - Pros: Neat class names, no repeated prefix.
  - Cons: It doesn't always work because the CSS can only be injected inside the shadow DOM root, which **may be blocked by the CSP**.
- CSS modules:
  - Pros: It can **bypass the CSP issue** because the CSS can be injected with the `GM_addStyle` API.
  - Cons: More code required, less readable class names in the DOM.

So if you expect your script to work in many different websites including those protected by CSP, CSS modules might be a better choice. Otherwise use global CSS with shadow DOM for simplicity.

### UnoCSS

UnoCSS is similar to TailwindCSS but arguably more flexible and reliable.

At the time of writing, TailwindCSS does not work well for userscripts, because it either injects reset CSS breaking the style of the host, or misses default values leading to invalid CSS output. This is a bug and has occurred before.

By using UnoCSS or its alternatives, **the effort of maintaining CSS code is significantly reduced**.

We just write class names based on what we need, and the CSS code will be generated automatically. If later we don't need this class name any more, the related CSS code will also be pruned.

### SolidJS

SolidJS is a light-weight UI library. It has some similarities with React, but much lighter and easier to use for a small project like a userscript.

However, SolidJS doesn't have an official UMD or IIFE package. In other words, there is no easy way for us to import SolidJS as a single file resource using `@require`.

We have several options here:

- Option 1: import it and bundle it in the userscript.
  - Pros: Simple to go.
  - Cons: **Bloated userscript size and worse readability**.

- Option 2: import it using dynamic import at runtime.
  - Pros: Better readability, smaller file size.
  - Cons: **An obvious delay before the UI appears**.
  - Suggestion: If the delay is acceptable, this might be a good choice.

- Option 3: compile SolidJS as a UMD package and use it in different scripts.

  This is exactly what I have done in the generator. Check the compiled file at [jsdelivr](https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2/dist/solid.js) and the source code at [@violentmonkey/dom](https://github.com/violentmonkey/vm-dom/blob/master/src/solid.ts).

  - Pros: Good readability, smaller file size, fast loading, reusable common assets between different scripts.
  - Cons: Need to maintain an extra file, and it might not always be up-to-date.

Absolutely, every decision involves a trade-off, and ultimately, you have to make your own choices.

## Summary

Thanks to the powerful tools, the development of a userscript is getting much smoother.

We can use the generator above to quickly create a new userscript with modern tech stack.
