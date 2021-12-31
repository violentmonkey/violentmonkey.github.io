---
title: Metadata Block
date: 2017-12-02 21:20:04
path: "/api/metadata-block/"
sidebar:
  match: /api/
  order: 1
---

The metadata must follow the format:
```js
// ==UserScript==
// @key value
// ==/UserScript==
```
Each line of the block must start with `//`, the first line must be `// ==UserScript==` and the last line must be `// ==/UserScript==`. No extra space is allowed at the beginning or ending of line.

Some of the keys can be localized for multiple languages, by adding a colon and the locale code to the key, e.g. `@name:zh-CN`. The locale code is case insensitive.

Labels:
- <span class="label">required</span> The key must be set.
- <span class="label">multilingual</span> The key can be localized by appending a colon and the locale code, e.g. `@name:zh-CN`.
- <span class="label">multiple</span> The key can be set multiple times.

### @name

<span class="label">required</span><span class="label">multilingual</span>

The name of the script, shown in script list and menus. It must be unique within a `@namespace`. If a script is being installed, and a script with the same `@namespace` and `@name` already exists, it will be replaced by the new one. Creating a script with same `@namespace` and `@name` will cause a conflict error.

Examples:

```js
// @name          Violentmonkey Script
// @name:zh-CN    暴力猴脚本
```

### @namespace

The combination of `@namespace` and `@name` is the unique identifier for a userscript. `@namespace` can be any string, for example the homepage of a group of userscripts by the same author. If not provided the `@namespace` falls back to an empty string (`''`).

Examples:

```js
// @namespace https://violentmonkey.github.io
```

### @match / @exclude-match

<span class="label">multiple</span>

Define rules to decide whether a script should be executed. It is recommended to use `@match` instead of `@include`.

See [more about matching](../matching/).

### @include / @exclude

<span class="label">multiple</span>

The old way to decide whether a script should be executed.

See [more about matching](../matching/).

### @version

Version of the script, it can be used to check if a script has new versions. It is composed of several parts, joined by `.`. Each part must start with numbers, and can be followed by alphabetic characters.

**Note:** If no `@version` is specified, the script will not be updated automatically.

Examples:

```js
// @version 1.0

// @version 1.2a.3
```

### @description

<span class="label">multilingual</span>

A brief summary to describe the script.

Examples:

```js
// @description         This script rocks.
// @description:zh-CN   这个脚本很棒！
```

### @icon

Specify an icon for the script.

Examples:

```js
// @icon https://my.cdn.com/icon.png
```

### @require

<span class="label">multiple</span>

Require another script to execute before the current one. The value is the URL to the required script, which may be relative to the URL the script is being installed from.

The required script will be downloaded along with installation and execute before the script.

Local files are not allowed to be required due to security concern. Also it does not make sense since scripts are supposed to work on different devices.

Examples:

```js
// @require https://my.cdn.com/jquery.js
```

### @resource

<span class="label">multiple</span>

Some static resources that can be accessed in the script by `GM_getResourceText` and `GM_getResourceURL`. The value is composed of two parts, joined with one or more white spaces. The first part is the name of the resource, no white space is allowed in it. The second part is the URL to the resource, which may be relative to the URL the script is being installed from.

The resource will be downloaded along with installation and can be accessed when the script executes.

Examples:

```js
// @resource logo https://my.cdn.com/logo.png
// @resource text https://my.cdn.com/some-text.txt
```

### @run-at

Decide when the script will execute.

Several values can be set for `@run-at`:

- `document-end` <span class="label">default</span>

  The script executes when `DOMContentLoaded` is fired. At this time, the basic HTML of the page is ready and other resources like images might still be on the way.

- `document-start`

  The script executes as soon as possible. There is no guarantee for the script to execute before other scripts in the page.

  Note: in Greasemonkey v3, the script may be ensured to execute even before HTML is loaded, but this is impossible for Violentmonkey as a web extension.

- `document-idle`

  The script executes after `DOMContentLoaded` is fired.

### @noframes

When present, the script will execute only in top level document, but not in nested frames.

```js
// @noframes
```

### @grant

<span class="label">multiple</span>

Specify which special APIs should be granted and can be used when the script executes.

If no `@grant` is present, `@grant none` is assumed.

* In case you don't need special API or sandboxing

    ```js
    // @grant none
    ```

    Sandbox is disabled in this mode, meaning the script can add/modify globals directly without the need to use `unsafeWindow`.
    
* In case any special API is used, it must be explicitly granted

    ```js
    // @grant GM_getValue
    // @grant GM_setValue
    ```

In addition to [GM API](../gm/) the following privileges may be granted:

* `// @grant window.close`

  *Since VM2.6.2*  
  Allows closing the tab via `window.close()`

* `// @grant window.focus`

  *Since VM2.12.10*  
  Allows focusing the tab via `window.focus()` even if the user didn't interact with it first.

### @inject-into

*Added in Violentmonkey v2.10.0*

Decide which context the script will be injected into.

If not set in the metadata block, the default value `page` will be used.
However, you can change the default value in Violentmonkey settings.

Possible values:

- `page` <span class="label">default</span>

    Inject into context of the web page.

    In this mode, `unsafeWindow` refers to the `window` object,
    allowing the script to access JavaScript objects of the web page,
    just like normal page scripts can.

- `content`

    Inject into context of [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts).

    In this mode, `unsafeWindow` refers to the `global` object in content script.
    As a result, the script can access and modify the page's DOM,
    but cannot access JavaScript objects of the web page.

- `auto`

    Try to inject into context of the web page. If blocked by CSP rules, inject as a content script.

### @downloadURL

The URL the script can be downloaded from.  Checked for updates automatically at a regular interval, and also manually on user request.  Automatically added when using "Install from URL."

### @supportURL

If supplied, the question mark icon in the user scripts list will link to this.

### @homepageURL

If supplied, the home icon in the user scripts list will link to this.


### @unwrap

Since VM2.13.1.

If supplied, the script will be injected as is into the global scope of the page, i.e. without our standard wrapper like `window.VMxxx=function(){...}`.

The [`@grant`](#grant) key is ignored so the script won't have access to `GM.*` or `GM_*` API.
The [`@inject-into`](#inject-into) key is supported as usual.

A typical use case is direct access to global page variables declared as `const` or `let`. In a standard userscript you would have to create a `script` element yourself explicitly by using `document.createElement` or  [`GM_addElement`](/api/gm/#gm_addelement), then transfer the result via a `CustomEvent` or `unsafeWindow.foo`.

Another use case is migration from other extensions that run your JavaScript code as is, without userscript API.
