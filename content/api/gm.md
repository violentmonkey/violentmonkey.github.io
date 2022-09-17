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

Violentmonkey APIs are derived from those in Greasemonkey v3, and most of them work the same way, `GM.*` [Greasemonkey v4-compatible](https://wiki.greasespot.net/Greasemonkey_Manual:API) aliases were added in VM2.12.0.

## GM_*

`GM_*` are a group of special APIs provided by Violentmonkey.

### GM_info

An object that exposes information about the current userscript. It has following properties:

- `uuid` *string*

    A unique ID of the script.

- `scriptMetaStr` *string*

    The meta block of the script.

- `scriptWillUpdate` *boolean*

    Whether the script will be updated automatically.

- `scriptHandler` *string*

    The name of userscript manager, which should be the string `Violentmonkey`.

- `version` *string*

    Version of Violentmonkey.

- `platform` *object* *(since VM2.12.4)*

    Unlike `navigator.userAgent`, which can be overriden by other extensions/userscripts or by devtools in device-emulation mode, `GM_info.platform` is more reliable as the data is obtained in the background page of Violentmonkey using a specialized extension API (browser.runtime.getPlatformInfo and getBrowserInfo).

    - `arch` *string*
    
        One of "arm", "mips", "mips64", "x86-32", "x86-64".
            
    - `browserName` *string*
    
        "chrome", "firefox" or whatever was returned by the API.

    - `browserVersion` *string*

    - `os` *string*
    
        One of "android", "cros", "linux", "mac", "openbsd", "win".
             
- `script` *object*

    Contains structured fields from the [Metadata Block](../metadata-block/):

    - `description` *string*
    - `excludes` *array of string*
    - `includes` *array of string*
    - `matches` *array of string*
    - `name` *string*
    - `namespace` *string*
    - `resources` *array of {name, url}*
    - `runAt` *string*
    - `version` *string*

- `injectInto` *string* *(since VM2.10.0)*

    The injection mode of current script. See [`@inject-mode`](/api/metadata-block/#inject-into) for more information.

### GM_getValue

Retrieves a value for current script from storage.

```js
let value = GM_getValue(key, defaultValue)
```

- `key` *string*

    The name for `value` to load.

- `defaultValue` *any*

    The default value to return if no value exists in the storage.

### GM_setValue

Sets a key / value pair for current script to storage.

```js
GM_setValue(key, value)
```

- `key` *string*

    The unique name for `value` within this script.

- `value` *any*

    The value to be stored, which must be *JSON serializable* (string, number, boolean, null, or an array/object consisting of these types) so for example you can't store DOM elements or objects with cyclic dependencies.

### GM_deleteValue

Deletes an existing key / value pair for current script from storage.

```js
GM_deleteValue(key)
```

- `key` *string*

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

* `name` *string*

    The name of the observed variable

* `callback` *function(name, oldValue, newValue, remote) {}*

    * `name` *string*

        The name of the observed variable

    * `oldValue` *any*

        The old value of the observed variable (`undefined` if it was created)

    * `newValue` *any*

        The new value of the observed variable (`undefined` if it was deleted)

    * `remote` *boolean*

        `true` if modified by the userscript instance of another tab or `false` for this script instance. Can be used by scripts of different browser tabs to communicate with each other.

### GM_removeValueChangeListener

Removes a change listener by its ID.

```js
GM_removeValueChangeListener(listenerId)
```

- `listenerId` *string*

### GM_getResourceText

Retrieves a text resource from the metadata block.

```js
let text = GM_getResourceText(name)
```

- `name` *string*

    Name of a resource defined in the [metadata block](../metadata-block/#resource).

### GM_getResourceURL

Retrieves a `blob:` or `data:` URL of a resource from the metadata block.

```js
let blobUrl = GM_getResourceURL(name);
let blobOrDataUrl = GM_getResourceURL(name, isBlobUrl);
```

- `name` *string*

    Name of a resource defined in the [metadata block](../metadata-block/#resource).

- `isBlobUrl` *boolean* (*since VM2.13.1*, optional, default: `true`)

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

* `parentNode` *Node | Element | ShadowRoot* (optional)

    The parent node to which the new node will be appended.

    It can be inside ShadowDOM: `someElement.shadowRoot`.

    When omitted, it'll be determined automatically:
    1. `document.head` (`<head>`) for `script`, `link`, `style`, `meta` tags.
    2. `document.body` (`<body>`) for other tags or when there's no `<head>`.
    3. `document.documentElement` (`<html>` or an XML root node) otherwise.

* `tagName` *string*

    A tag name like `'script'`. Any valid HTML tag can be used, but the only motivation for this API was to add `script`, `link`, `style` elements when they are disallowed by a strict `Content-Security-Policy` of the site e.g. github.com, twitter.com.

* `attributes` *object* (optional)

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

- `css` *string*

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

    - `url` *string*

        The URL to open in a new tab. URL relative to current page is also allowed.
        Note: Firefox does not support data URLs.

    - `options` *object* (optional)

        - `active` *boolean*, default: `true` 

            Make the new tab active (i.e. open in foreground).
            
        - `container` *number* *(since VM2.12.5, Firefox-only)*
                  
            Set [tab's container](https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers) in Firefox:
            * not specified = reuse script's tab container
            * `0` = default (main) container
            * `1`, `2`, etc. = internal container index

        - `insert` *boolean* *(since VM2.11.0)*, default: `true`
         
            Insert the new tab next to the current tab and set its "openerTab" so when it's closed the original tab will be focused automatically. When `false` or not specified, the usual browser behavior is to open the tab at the end of the tab list.

        - `pinned` *boolean* *(since VM2.12.5)*, default: `false`
                  
            Pin the tab (i.e. show without a title at the beginning of the tab list).
            
2. Using a boolean, compatible with Greasemonkey:

    ```js
    let tabControl = GM_openInTab(url, openInBackground)
    ```

    - `openInBackground` *boolean*

        Open the tab in background.
        Note, this is a reverse of the first usage method so for example `true` is the same as `{ active: false }`.

Returns an object with following properties:
- `onclose`

    Сan be assigned to a function. If provided, it will be called when the opened tab is closed.

- `closed` *boolean*

    Whether the opened tab is closed.

- `close` *function*

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

- `caption` *string*

    The name to show in the popup menu.

- `onClick` *function*

    When the command is clicked in the menu, this function will run with the following parameter:

    * `event` *[MouseEvent](https://developer.mozilla.org/docs/Web/API/MouseEvent) | [KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)* *(since VM2.13.1)* is the event that activated the command so you can check `event.button`, `event.shiftKey`, `event.key`, and so on. 

If you want to add a shortcut, please see [vm.shortcut](https://github.com/violentmonkey/vm-shortcut).

### GM_unregisterMenuCommand

Unregisters a command which has been registered to Violentmonkey popup menu.

```js
GM_unregisterMenuCommand(caption)
```

- `caption` *string*

    The name of command to unregister.

### GM_notification

Shows an HTML5 desktop notification.

1. using an object:

    ```js
    let control = GM_notification(options)
    ```

    - `options` *object*

        - `text` *string* (required)

            Main text of the notification.

        - `title` *string*

            Title of the notification.

        - `image` *string*

            URL of an image to show in the notification.

        - `onclick` *function*

            Callback when the notification is clicked by user.

        - `ondone` *function*

            Callback when the notification is closed, either by user or by system.

2. Using separate parameters, compatible with Greasemonkey:

    ```js
    GM_notification(text, title, image, onclick)
    ```

    - `text` *string* (required)

        Main text of the notification.

    - `title` *string*

        Title of the notification.

    - `image` *string*

        URL of an image to show in the notification.

    - `onclick` *function*

        Callback when the notification is clicked by user.

**As of VM2.12.8** returns a control object with the following properties:

- `remove` *function(): Promise*

    A function to remove the notification.

### GM_setClipboard

Sets data to system clipboard.

```js
GM_setClipboard(data, type)
```

- `data` *string*

    The data to be copied to system clipboard.

- `type` *string*

    The MIME type of data to copy. Default as `text/plain`.

### GM_xmlhttpRequest

Makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy.

**Note:** `h` is lowercase (the historical spelling)

```js
let control = GM_xmlhttpRequest(details)
```

- `details` *object*:

    - `url` *string* (required)

        URL relative to current page is also allowed.

    - `method` *string*

        Usually `GET`.

    - `user` *string*

        User for authentication.

    - `password` *string*

        Password for authentication.

    - `overrideMimeType` *string*

        A MIME type to specify with the request.

    - `headers` *object*

        For example `{ 'name1': 'value1', 'name2': 'value2' }`.

        Some special headers are also allowed:

        - `'Cookie'`
        - `'Host'`
        - `'Origin'`
        - `'Referer'`
        - `'User-Agent'`

    - `responseType` *string*

        One of the following:

        - `'text'` *(default value)*
        - `'json'`
        - `'blob'`
        - `'arraybuffer'`
        - `'document'` *(since VM2.12.0)*

    - `timeout` *number* *(since VM2.9.5)*

        Time to wait for the request, none by default.

    - `data` *string | FormData | Blob*

        Data to send with the request, usually for `POST` and `PUT` requests.

    - `binary` *boolean* *(since VM2.12.2)*

        Send the `data` string as a `blob`. This is for compatibility with Tampermonkey/Greasemonkey, where only `string` type is allowed in `data`.

    - `context` *any*

        Can be an object and will be assigned to `context` of the response object.

    - `anonymous` *boolean* *(since VM2.10.1)*

        When set to `true`, no cookie will be sent with the request and since VM2.12.5 the response cookies will be ignored. The default value is `false`.

    Event handlers:

    - `onabort`
    - `onerror`
    - `onload`
    - `onloadend`
    - `onloadstart` *(since VM2.12.5)*
    - `onprogress`
    - `onreadystatechange`
    - `ontimeout`
    
    Each event handler is a *function* that accepts one argument `responseObject`

> Note:
>
> - `synchronous` is not supported.

Returns a control object with the following properties:

- `abort` *function()*

    A function to abort the request.

The response object is passed to each event handler with the following properties, most of which are identical to those provided by the standard [XMLHttpRequest](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest):

- `status` *number*
- `statusText` *string*
- `readyState` *number*
- `responseHeaders` *string*
- `response` *string | Blob | ArrayBuffer | Document | Object | null*
- `responseText` *string | undefined*, only provided when available
- `finalUrl` *string*, the final URL after redirection
- `context` *any*, the same `context` object you specified in `details`

### GM_download

*Since VM2.9.5*

Downloads a URL to a local file.

1. using an object:

    ```js
    GM_download(options)
    ```

    - `options` *object*:

        - `url` *string* (required)

            The URL to download.

        - `name` *string*

            The filename to save to. Folders/subpaths aren't supported yet.

        - `onload` *function*

            Called after the data is downloaded from URL, before writing the file.

        These are the same as in [GM_xmlhttpRequest](#gm_xmlhttprequest):

        - `headers` *object*
        - `timeout` *number*
        - `onerror` *function*
        - `onprogress` *function*
        - `ontimeout` *function*

2. using separate parameters:

    ```js
    GM_download(url, name)
    ```

    - `url` *string* (required)

        The URL to download.

    - `name` *string*

        The filename to save to. Folders/subpaths aren't supported yet.

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
