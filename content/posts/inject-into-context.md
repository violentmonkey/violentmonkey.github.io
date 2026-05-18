---
title: Inject scripts into different contexts
date: 2018-11-23 23:35:11
tags:
  - inject
path: /posts/inject-into-context/
redirect_from:
  - /2018/11/23/inject-into-context/
---

Violentmonkey v2.10.0 and newer supports [`// @inject-into`](/api/metadata-block/#inject-into) metadata comment to **enable injection on CSP restricted pages in Firefox without suppressing CSP and lowering website security**, although if your script accesses/modifies variables of the webpage you need to make some changes as described in [`content`](#mode-content) section below.

The default mode is [`auto`](#mode-auto), you can change it in Violentmonkey's settings. The actual mode can be seen by a userscript in [GM_info.injectInto](/api/#gm_info). The popup also shows a `C` mark since Violentmonkey v2.38.0 for scripts in `content` mode.

## Contexts

Violentmonkey supports 2 types of context for a script to execute in:

- context of a web page

    The context in which all scripts of a web page execute. We will call it "*page context*" later.

- context of content scripts

    The context in which [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) execute. We will call it "*content context*" later.

## Injection Modes

In earlier versions of Violentmonkey, all scripts were injected into the *page context*. This works well in Chrome and usually in Firefox except for websites with strict CSP that blocks inline scripts created by a WebExtension, like [GitHub](https://github.com). As a workaround, Violentmonkey can inject userscripts into the *content context*.

### Mode: `page`

Same behavior as in older Violentmonkey. Injection fails in Firefox on sites with strict CSP that forbids inline scripts.

### Mode: `content`

Scripts run in the *content context*, a secure "isolated world".

Content userscripts can't access JavaScript objects of the webpage in Chrome and by default in Firefox, but the latter allows you to use `wrappedJSObject`, optionally `cloneInto` and `exportFunction` (see [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts)).

* Universal workaround: DOM messaging via `CustomEvent` (synchronous) or `window.postMessage` (asynchronous).

* Firefox-only workaround:

    ```js
    if (typeof exportFunction === 'function') {
      const wnd = typeof unsafeWindow === 'object' ? unsafeWindow : window;
      wnd.wrappedJSObject.foo = 1;
      wnd.wrappedJSObject.bar = exportFunction(function myFancyApi(x) {
        return cloneInto({ test: () => x }, wnd, { cloneFunctions: true });
      });
    }
    ```
### Mode: `auto`

In this mode, scripts will be injected into the *page context* if possible. If blocked by CSP, they will be injected into the *content context*. It is the script author's job to check the environments.
