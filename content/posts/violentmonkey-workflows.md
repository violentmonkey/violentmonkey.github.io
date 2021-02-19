---
title: Violentmonkey Workflows
date: 2021-02-19 21:21:04+0800
tags:
  - development
path: /posts/violentmonkey-workflows/
---

Some facts:

- There are some users worrying about privacy issues and malicious code in Violentmonkey's released versions ([#1109](https://github.com/violentmonkey/violentmonkey/issues/1109)).
- There is some disingenuous guy [telling that Violentmonkey is trying to "disguise the bad things the addon is doing"](https://www.reddit.com/r/firefox/comments/9uemks/greasemonkey_tampermonkey_violentmonkey_which_one/ehgky9a/). This is of course not true. Thanks to @Venryx for letting me know this ([#587](https://github.com/violentmonkey/violentmonkey/issues/587)).

This post is trying to clarify the development workflows and how the extension is reviewed before it can be published at CWS (Chrome Web Store), AMO (addons.mozilla.org), Microsoft Edge Addons (MEA), etc.

## Workflows

Basically we develop Violentmonkey with modern JavaScript syntax (ESNext) and build it with Babel, Webpack and their friends.

The source code is all kept in `src`. All the dependencies are imported via standard ES modules from NPM installed packages. The dependencies are installed via `yarn` so that we can leverage `yarn.lock` to make sure every developer gets exactly the same dependencies installed.

### Development

By running `yarn dev`, we can get the development package in `dist`, which is unminified. The compiler keeps writing updates to `dist` once the source code changes.

The files in development mode contains a lot of code that should not run for users, such as development logs, helpful warnings for developers, etc. That is why the bundles generated during development are much larger (perhaps 10x) than those in the final release and runs much slower.

### Release

When we are ready for a new release, we run `yarn build` to compile the source code in production mode, dropping all unnecessary spaces, debugging code, dead code, and optimizing statements to make them shorter.

All the tools involved in the toolchain are either included in the source code or installed via NPM, in other words they are totally public, and you can always check the code and build your own version.

Thanks to GitHub actions, the build process is triggered automatically once a tag is created in the repository, completely transparent to users. The action definitions can be found at [.github/workflows/release.yml](https://github.com/violentmonkey/violentmonkey/blob/master/.github/workflows/release.yml).

### Publication

After the release package is created by GitHub actions, we download the release package and upload it to different stores.

There is a review step in all popular stores. In CWS we have to clarify why each permission is required in `manifest.json`. **In AMO and MEA we need to provide the source code and tell the reviewers how our project is built, then the reviewers build the package from scratch and compare it to the version we submitted to make sure they are the same.** So if you are installing Violentmonkey from the official links, you don't need to worry about trackers or malicious code that is not shown in the source code because the reviewers have confirmed they are clean.

One exception is the beta release for Firefox, which is self-signed and self-hosted, aka. unlisted version -- AMO has [dropped support for beta versions and recommended the unlisted version for testing purpose](https://blog.mozilla.org/addons/2018/02/28/discontinuing-support-for-beta-versions/) since 2018. We serve our beta versions on top of this feature, and the whole process is automated via GitHub actions as mentioned above. The generated package is immediately uploaded to AMO and signed, and then uploaded to GitHub assets.

## Why is the source code compiled?

Since we are in 2020s, this question should not be asked by a web developer. If you have employed such a guy, trust me, he/she should be fired.

We are using many lovely features in our project, some from ESNext, and some are popular in development but not supported natively by any browser. So we compile those parts to legacy JavaScript code to make the extension work for more browsers.

For example, we build UI in Violentmonkey with [Vue.js](https://vuejs.org/), a popular framework good at building complexed UIs. It depends on quite a few custom annotations which need to be transformed to vanilla JavaScript and CSS so that the browser can understand.

There are also some constants injected at compilation time so that we don't need to hard-code them.

## Why is the generated code minified?

Generally, the larger the code is, the longer it takes for the parser to parse. So it is very common for web apps to minify the code before publication.

Another reason which is even more important is to strip the debugging related code because it actually runs in browser and slowers the runtime. It may be important for developers to find bugs but useless for normal users.

This is mainly what code minification does, but not code obfuscation. Code obfuscation usually encodes the minified code to make it harder to read. As a result, it becomes slower because decoding is required before the code can execute. We don't need this and we have never included such tools in our project.

## How to build the code by yourself?

If you don't believe us and want to build the code by yourself, you can clone the Violentmonkey project and follow the build steps in README.
