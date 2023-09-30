---
title: GM_* APIs
date: 2018-04-25 15:15:15
path: "/api/gm/"
redirect_from:
  - /api/
sidebar:
  match: /api/
  order: 0
---

import { Field } from '@/components/field';
import { InfoBox } from '@/components/box';

Violentmonkey APIs are derived from those in Greasemonkey v3, and most of them work the same way, `GM.*` [Greasemonkey v4-compatible](https://wiki.greasespot.net/Greasemonkey_Manual:API) aliases were added in VM2.12.0.

## GM_*

`GM_*` are a group of special APIs provided by Violentmonkey.

### GM_info

An object that exposes information about the current userscript. It has following properties:

- <Field name="uuid" type="string" />

    A unique ID of the script.

- <Field name="scriptMetaStr" type="string" />

    The meta block of the script.

- <Field name="scriptWillUpdate" type="boolean" />

    Whether the script will be updated automatically.

- <Field name="scriptHandler" type="string" />

    The name of userscript manager, which should be the string `Violentmonkey`.

- <Field name="version" type="string" />

    Version of Violentmonkey.

- <Field name="isIncognito" type="boolean" comment="since VM2.15.4" />

  Whether the browser is in Private mode.

- <Field name="platform" type="object" comment="since VM2.12.4" />

    Unlike `navigator.userAgent`, which can be overriden by other extensions/userscripts or by devtools in device-emulation mode, `GM_info.platform` is more reliable as the data is obtained in the background page of Violentmonkey using a specialized extension API (browser.runtime.getPlatformInfo and getBrowserInfo).

    - <Field name="arch" type="string" />

        One of "arm", "mips", "mips64", "x86-32", "x86-64".

    - <Field name="browserName" type="string" />

        "chrome", "firefox" or whatever was returned by the API.

    - <Field name="browserVersion" type="string" />

    - <Field name="os" type="string" />

        One of "android", "cros", "linux", "mac", "openbsd", "win".

- <Field name="script" type="object" />

    Contains structured fields from the [Metadata Block](../metadata-block/):

    - <Field name="description" type="string" />
    - <Field name="excludes" type="string[]" />
    - <Field name="includes" type="string[]" />
    - <Field name="matches" type="string[]" />
    - <Field name="name" type="string" />
    - <Field name="namespace" type="string" />
    - <Field name="resources" type="Array<{name, url}>" />
    - <Field name="runAt" type="string" />
    - <Field name="version" type="string" />

- <Field name="injectInto" type="string" comment="since VM2.10.0" />

    The injection mode of current script. See [`@inject-mode`](/api/metadata-block/#inject-into) for more information.

### GM_getValue

Retrieves a value for current script from storage.

```js
let value = GM_getValue(key, defaultValue)
```

- <Field name="key" type="string" />

    The name for `value` to load.

- <Field name="defaultValue" type="any" />

    The default value to return if no value exists in the storage.

### GM_setValue

Sets a key / value pair for current script to storage.

```js
GM_setValue(key, value)
```

- <Field name="key" type="string" />

    The unique name for `value` within this script.

- <Field name="value" type="any" />

    The value to be stored, which must be *JSON serializable* (string, number, boolean, null, or an array/object consisting of these types) so for example you can't store DOM elements or objects with cyclic dependencies.

### GM_deleteValue

Deletes an existing key / value pair for current script from storage.

```js
GM_deleteValue(key)
```

- <Field name="key" type="string" />

    The unique name for `value` within this script.

### GM_listValues

Returns an array of keys of all available values within this script.

```js
let arrayOfKeys = GM_listValues()
```

### GM_addValueChangeListener

Adds a change listener to the storage and returns the listener ID.

```js
let listenerId = GM_addValueChangeListener(name, callback)
```

* <Field name="name" type="string" />

    The name of the observed variable

* <Field name="callback" type="(name, oldValue, newValue, remote) => void" />

    * <Field name="name" type="string" />

        The name of the observed variable

    * <Field name="oldValue" type="any" />

        The old value of the observed variable (`undefined` if it was created)

    * <Field name="newValue" type="any" />

        The new value of the observed variable (`undefined` if it was deleted)

    * <Field name="remote" type="boolean" />

        `true` if modified by the userscript instance of another tab or `false` for this script instance. Can be used by scripts of different browser tabs to communicate with each other.

### GM_removeValueChangeListener

Removes a change listener by its ID.

```js
GM_removeValueChangeListener(listenerId)
```

- <Field name="listenerId" type="string" />

### GM_getResourceText

Retrieves a text resource from the metadata block.

```js
let text = GM_getResourceText(name)
```

- <Field name="name" type="string" />

    Name of a resource defined in the [metadata block](../metadata-block/#resource).

### GM_getResourceURL

Retrieves a `blob:` or `data:` URL of a resource from the metadata block.

```js
let blobUrl = GM_getResourceURL(name);
let blobOrDataUrl = GM_getResourceURL(name, isBlobUrl);
```

- <Field name="name" type="string" />

    Name of a resource defined in the [metadata block](../metadata-block/#resource).

- <Field name="isBlobUrl" type="boolean" comment="since VM2.13.1" defaultValue="true" />

    * `true` returns a `blob:` URL. It's short and cacheable, so it's good for reusing in multiple DOM elements.

    * `false` returns a `data:` URL. It's long so reusing it in DOM may be less performant due to the lack of caching, but it's particularly handy for direct synchronous decoding of the data on sites that forbid fetching `blob:` in their CSP.

Note: when setting this URL as `src` or `href` of a DOM element, it may fail on some sites with a particularly strict CSP that forbids `blob:` or `data:` URLs. Such sites are rare though. The workaround in Chrome is to use `GM_addElement`, whereas in Firefox you'll have to disable CSP either globally via `about:config` or by using an additional extension that modifies HTTP headers selectively.

### GM_addElement

*Since VM2.13.1*

Appends and returns an element with the specified attributes.

```js
let element1 = GM_addElement(tagName, attributes);
let element2 = GM_addElement(parentNode, tagName, attributes);
```

* <Field name="parentNode?" type="Node | Element | ShadowRoot" />

    The parent node to which the new node will be appended.

    It can be inside ShadowDOM: `someElement.shadowRoot`.

    When omitted, it'll be determined automatically:
    1. `document.head` (`<head>`) for `script`, `link`, `style`, `meta` tags.
    2. `document.body` (`<body>`) for other tags or when there's no `<head>`.
    3. `document.documentElement` (`<html>` or an XML root node) otherwise.

* <Field name="tagName" type="string" />

    A tag name like `'script'`. Any valid HTML tag can be used, but the only motivation for this API was to add `script`, `link`, `style` elements when they are disallowed by a strict `Content-Security-Policy` of the site e.g. github.com, twitter.com.

* <Field name="attributes?" type="object" />

    The keys are HTML attributes, not DOM properties, except `textContent` which sets DOM property `textContent`. The values are strings so if you want to assign a private function to `onload` you can do it after the element is created.

Examples:
```js
// using a private function in `onload`
let el = GM_addElement('script', { src: 'https://....' });
el.onload = () => console.log('loaded', el);
```
```js
// same as GM_addStyle('a { color:red }')
let el = GM_addElement('style', { textContent: 'a { color:red }' });
```
```js
// appending to an arbitrary node
let el = GM_addElement(parentElement.shadowRoot, 'iframe', { src: url });
```
Notes:
* The element is returned immediately (synchronously) even with `GM.addElement`, no need for `.then()`, but you can use it if you want, just once though as it's auto-removed to avoid recursion. The API is synchronous because Violentmonkey runs scripts only when the root element appears, so there's always a node to serve as a parent.
* Invalid arguments will raise an exception, which can be caught using `try {} catch (e) {}`, just like standard DOM API `document.createElement`.
* This API is experimental in Tampermonkey, and hence subject to change.

### GM_addStyle

Appends and returns a `<style>` element with the specified CSS.

```js
let styleElement = GM_addStyle(css);
```

- <Field name="css" type="string" />

    The CSS code to inject.

Older versions of Violentmonkey (prior to 2.12.0) returned an imitation of Promise,
which is still maintained for compatibility, so don't be surprised if you see code like
`GM_addStyle(css).then(el => { /* whatever */ });`

### GM_openInTab

Opens URL in a new tab.

1. using an object

    ```js
    let tabControl = GM_openInTab(url, options)
    ```

    - <Field name="url" type="string" />

        The URL to open in a new tab. URL relative to current page is also allowed.

        Note that [Firefox disallows](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create#:~:text=security%20reasons) `data:`, `blob:`, `chrome:`, `file:`, and many `about:` URLs.

    - <Field name="options?" type="object" />

        - <Field name="active" type="boolean" defaultValue="true" />

            Make the new tab active (i.e. open in foreground).

        - <Field name="container?" type="number" comment="since VM2.12.5, Firefox-only" />

            Set [tab's container](https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers) in Firefox:
            * not specified = reuse script's tab container
            * `0` = default (main) container
            * `1`, `2`, etc. = internal container index

        - <Field name="insert" type="boolean" comment="since VM2.11.0" defaultValue="true" />

            Insert the new tab next to the current tab and set its "openerTab" so when it's closed the original tab will be focused automatically. When `false` or not specified, the usual browser behavior is to open the tab at the end of the tab list.

        - <Field name="pinned" type="boolean" comment="since VM2.12.5" defaultValue="false" />

            Pin the tab (i.e. show without a title at the beginning of the tab list).

2. Using a boolean, compatible with Greasemonkey:

    ```js
    let tabControl = GM_openInTab(url, openInBackground)
    ```

    - <Field name="openInBackground" type="boolean" />

        Open the tab in background.
        Note, this is a reverse of the first usage method so for example `true` is the same as `{ active: false }`.

Returns an object with following properties:

- <Field name="onclose?" type="() => void" />

    Сan be assigned to a function. If provided, it will be called when the opened tab is closed.

- <Field name="closed" type="boolean" />

    Whether the opened tab is closed.

- <Field name="close" type="() => void" />

    A function to explicitly close the opened tab.

```js
let tabControl = GM_openInTab(url);
tabControl.onclose = () => console.log('tab is closed');
tabControl.close();
```

### GM_registerMenuCommand

Registers a command in Violentmonkey popup menu.

```js
GM_registerMenuCommand(caption, onClick)
// v2.12.5 and newer return an `id` equal to `caption` for compatibility with TM
const id = GM_registerMenuCommand(caption, onClick)
```

- <Field name="caption" type="string" />

    The name to show in the popup menu.

- <Field name="onClick" type="() => void" />

    When the command is clicked in the menu, this function will run with the following parameter:

    * <Field name="event" type={<><a href="https://developer.mozilla.org/docs/Web/API/MouseEvent">MouseEvent</a> | <a href="https://developer.mozilla.org/docs/Web/API/KeyboardEvent">KeyboardEvent</a></>} comment="since VM2.13.1" /> is the event that activated the command so you can check `event.button`, `event.shiftKey`, `event.key`, and so on.

If you want to add a shortcut, please see [vm.shortcut](https://github.com/violentmonkey/vm-shortcut).

### GM_unregisterMenuCommand

Unregisters a command which has been registered to Violentmonkey popup menu.

```js
GM_unregisterMenuCommand(caption)
```

- <Field name="caption" type="string" />

    The name of command to unregister.

### GM_notification

Shows an HTML5 desktop notification.

1. using an object:

    ```js
    let control = GM_notification(options)
    ```

    - <Field name="options" type="object" />

        - <Field name="text" type="string" />

            Main text of the notification.

        - <Field name="title?" type="string" />

            Title of the notification.

        - <Field name="image?" type="string" />

            URL of an image to show in the notification.

        - <Field name="silent?" type="boolean" comment="since VM2.15.2, Chrome 70" defaultValue="false" />

            No sounds/vibrations when showing the notification. Only for Chromium-based browsers as of Aug 2023.

        - <Field name="tag?" type="string" comment="since VM2.15.4"/>

            Unique name of the notification, e.g. 'abc', same as the web Notification API. Names are scoped to each userscript i.e. your tag won't clash with another script's tag.

            The purpose of a tagged notification is to replace an older notification with the same tag, even if it was shown in another tab (or before this tab was navigated elsewhere and your notification had `zombieTimeout`).

        - <Field name="zombieTimeout?" type="number" comment="since VM2.15.4" defaultValue="0"/>

            Number of milliseconds to keep the notification after the userscript "dies", i.e. when its tab or frame is reloaded/closed/navigated. If not specified or invalid, the default behavior is to immediately remove the notifications.

        - <Field name="onclick?" type="() => void" />

            Callback when the notification is clicked by user. As of VM2.15.2 it also forces the notification to be visible until clicked in Chrome which by default hides the notification after a few seconds.

        - <Field name="ondone?" type="() => void" />

            Callback when the notification is closed, either by user or by system.

2. Using separate parameters, compatible with Greasemonkey:

    ```js
    GM_notification(text, title, image, onclick)
    ```

    - <Field name="text" type="string" />

        Main text of the notification.

    - <Field name="title?" type="string" />

        Title of the notification.

    - <Field name="image?" type="string" />

        URL of an image to show in the notification.

    - <Field name="onclick?" type="() => void" />

        Callback when the notification is clicked by user.

**As of VM2.12.8** returns a control object with the following properties:

- <Field name="remove" type="() => Promise<void>" />

    A function to remove the notification.

### GM_setClipboard

Sets data to system clipboard.

```js
GM_setClipboard(data, type)
```

- <Field name="data" type="string" />

    The data to be copied to system clipboard.

- <Field name="type" type="string" defaultValue="'text/plain'" />

    The MIME type of data to copy.

### GM_xmlhttpRequest

Makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy.

Note: `h` is lowercase (the historical spelling).

```js
let control = GM_xmlhttpRequest(details)
```

- <Field name="details" type="object" />

  - <Field name="url" type="string" />

    URL relative to current page is also allowed.

  - <Field name="method?" type="string" />

    Usually `GET`.

  - <Field name="user?" type="string" />

    User for authentication.

  - <Field name="password?" type="string" />

    Password for authentication.

  - <Field name="overrideMimeType?" type="string" />

    A MIME type to specify with the request.

  - <Field name="headers?" type="object" />

    For example `{ 'name1': 'value1', 'name2': 'value2' }`.

    Some special headers are also allowed:

    - `'Cookie'`
    - `'Host'`
    - `'Origin'`
    - `'Referer'`
    - `'User-Agent'`

  - <Field name="responseType?" type="string" />

    One of the following:

    - `'text'` :point_left: default
    - `'json'`
    - `'blob'`
    - `'arraybuffer'`
    - `'document'` *(since VM2.12.0)*

  - <Field name="timeout?" type="number" comment="since VM2.9.5" />

    Time to wait for the request, none by default.

  - <Field name="data?" type="string | ArrayBuffer | Blob | DataView | FormData | ReadableStream | TypedArray | URLSearchParams" />

    Data to send with the request, usually for `POST` and `PUT` requests.

  - <Field name="binary?" type="boolean" comment="since VM2.12.2" />

    Send the `data` string as a `blob`. This is for compatibility with Tampermonkey/Greasemonkey, where only `string` type is allowed in `data`.

  - <Field name="context?" type="any" />

    Can be an object and will be assigned to `context` of the response object.

  - <Field name="anonymous?" type="boolean" comment="since VM2.10.1" defaultValue="false" />

    When set to `true`, no cookie will be sent with the request and since VM2.12.5 the response cookies will be ignored.

    When absent, an inverted value of Greasemonkey4-compatible `withCredentials` is used. Note that Violentmonkey sends cookies by default, like Tampermonkey, but unlike Greasemonkey4 (same-origin `url` only).

  Event handlers:

  - <Field name="onabort?" type="() => void" />
  - <Field name="onerror?" type="() => void" />
  - <Field name="onload?" type="() => void" />
  - <Field name="onloadend?" type="() => void" />
  - <Field name="onloadstart?" type="() => void" comment="since VM2.12.5" />
  - <Field name="onprogress?" type="() => void" />
  - <Field name="onreadystatechange?" type="() => void" />
  - <Field name="ontimeout?" type="() => void" />

  Each event handler is a *function* that accepts one argument `responseObject`

> Note:
>
> - `synchronous` is not supported.

Returns a control object with the following properties:

- <Field name="abort" type="() => void" />

  A function to abort the request.

The response object is passed to each event handler with the following properties, most of which are identical to those provided by the standard [XMLHttpRequest](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest):

- <Field name="status" type="number" />
- <Field name="statusText" type="string" />
- <Field name="readyState" type="number" />
- <Field name="responseHeaders" type="string" />
- <Field name="response" type="string | Blob | ArrayBuffer | Document | object | null" />
- <Field name="responseText" type="string | undefined" />, only provided when available
- <Field name="responseXML" type="Document | null" comment="since VM2.13.4" />, only provided when available
- <Field name="lengthComputable" type="boolean" />, only provided when available
- <Field name="loaded" type="number" />, only provided when available
- <Field name="total" type="number" />, only provided when available
- <Field name="finalUrl" type="string" />, the final URL after redirection
- <Field name="context" type="any" />, the same `context` object you specified in `details`

### GM_download

*Since VM2.9.5*

Downloads a URL to a local file.

1. using an object:

    ```js
    GM_download(options)
    ```

    - <Field name="options" type="object" />:

        - <Field name="url" type="string" />

            The URL to download.

        - <Field name="name" type="string" />

            The filename to save to. Folders/subpaths aren't supported yet.

        Most [GM_xmlhttpRequest](#gm_xmlhttprequest) options are supported.

        - <Field name="headers?" type="object" />
        - <Field name="timeout?" type="number" comment="since VM2.9.5" />
        - <Field name="context?" type="any" comment="since VM2.13.4" />
        - <Field name="user?" type="string" comment="since VM2.13.4" />
        - <Field name="password?" type="string" comment="since VM2.13.4" />
        - <Field name="anonymous?" type="boolean" comment="since VM2.13.4" defaultValue="false" />
        - <Field name="onabort?" type="() => void" comment="since VM2.13.4" />
        - <Field name="onerror?" type="() => void" />
        - <Field name="onload?" type="() => void" />
        - <Field name="onloadend?" type="() => void" comment="since VM2.13.4" />
        - <Field name="onloadstart?" type="() => void" comment="since VM2.13.4" />
        - <Field name="onprogress?" type="() => void" />
        - <Field name="onreadystatechange?" type="() => void" comment="since VM2.13.4" />
        - <Field name="ontimeout?" type="() => void" />

       The `onload` event handler is called after the data is downloaded from URL, before writing the file.

2. using separate parameters:

    ```js
    GM_download(url, name)
    ```

    - <Field name="url" type="string" />

      The URL to download.

    - <Field name="name" type="string" />

      The filename to save to. Folders/subpaths aren't supported yet.

Returns a control object with the following properties, same as [GM_xmlhttpRequest](#gm_xmlhttprequest):

- <Field name="abort" type="() => void" />

  A function to abort the request.

## GM.*

`GM` *(since VM2.12.0)* is a single variable with [Greasemonkey4-compatible](https://wiki.greasespot.net/Greasemonkey_Manual:API) aliases:

* [GM.addStyle](#gm_addstyle)
* [GM.addElement](#gm_addelement) - *since VM2.13.1*
* [GM.registerMenuCommand](#gm_registermenucommand) - *since VM2.12.10, GM4.11*
* [GM.deleteValue](#gm_deletevalue) *(async)*
* [GM.getResourceUrl](#gm_getresourceurl) *(async)* - in VM2.12.0...2.13.0 it was misspelled as `GM.getResourceURL`
* [GM.getValue](#gm_getvalue) *(async)*
* [GM.info](#gm_info)
* [GM.listValues](#gm_listvalues) *(async)*
* [GM.notification](#gm_notification)
* [GM.openInTab](#gm_openintab)
* [GM.setClipboard](#gm_setclipboard)
* [GM.setValue](#gm_setvalue) *(async)*
* [GM.xmlHttpRequest](#gm_xmlhttprequest) - note `H` is uppercase

The `async` functions return a `Promise` that's resolved with the returned value.
