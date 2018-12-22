---
title: GM_* APIs
date: 2018-04-25 15:15:15
layout: page
path: "/api/gm/"
---

`GM_*` are a group of special APIs provided by Violentmonkey.

### GM_info

An object that exposes information about the current userscript. It has following properties:

- `uuid`

    A unique ID of the script.

- `scriptMetaStr`

    The meta block of the script.

- `scriptWillUpdate`

    Whether the script will be updated automatically.

- `scriptHandler`

    The name of userscript manager, which should be the string `Violentmonkey`.

- `version`

    Version of Violentmonkey.

- `script`

    An object containing structured fields from the [Metadata Block](../metadata-block/):

    - `description` *string*
    - `excludes` *array*
    - `includes` *array*
    - `matches` *array*
    - `name` *string*
    - `namespace` *string*
    - `resources` *array &lt;string name, string url&gt;*
    - `runAt` *string*
    - `version` *string*

- `injectInto` *added in Violentmonkey v2.10.0*

    The injection mode of current script. See [`@inject-mode`](/api/metadata-block/#inject-into) for more information.

### GM_getValue

Retrieve a value for current script from storage.

```js
GM_getValue(key, default)
```

- `key` *string*

    The name for `value` to load.

- `default` *any*

    The default value to return if no value exists in the storage.

Returns the retrieved value or default value.

### GM_setValue

Set a key / value pair for current script to storage.

```js
GM_setValue(key, value)
```

- `key` *string*

    The unique name for `value` within this script.

- `value` *any*

    The value to be stored, which must be **JSON serializable**.

Returns nothing.

### GM_deleteValue

Delete an existing key / value pair for current script from storage.

```js
GM_deleteValue(key)
```

Returns nothing.

### GM_listValues

Retrieve the list of keys of all available values within this script.

```js
GM_listValues()
```

Returns an array of all available keys.

### GM_getResourceText

Retrieve the predefined text resource.

```js
GM_getResourceText(name)
```

- `name` *string*

    Name of resource that is defined in [metadata block](../metadata-block/#resource).

Returns the predefined text content.

### GM_getResourceURL

Retrieve a BLOB URL of the predefined resource.

```js
GM_getResourceURL(name)
```

- `name` *string*

    Name of resource that is defined in [metadata block](../metadata-block/#resource).

Returns a BLOB URL.

### GM_addStyle

Creates a `<style>` element and injects some CSS.

```js
GM_addStyle(css)
.then(style => {
  console.log('This is the <style> element:', style);
});
```

- `css` *string*

    The CSS code to inject.

Returns a Promise-like object with a `.then` method, which accepts a callback whose first argument is the injected `<style>` element.

### GM_openInTab

Open URL in a new tab.

```js
GM_openInTab(url, options)
GM_openInTab(url, openInBackground)
```

- `url` *string*

    The URL to open in a new tab. URL relative to current page is also allowed.

    Note: Firefox does not support data URLs.

- `options` *object optional*

    - `options.active` *boolean*

        Whether the new tab should be loaded and activated.

The second usage is compatible with Greasemonkey.

- `openInBackground` *boolean*

    `openInBackground = true` is the same as `options = { active: false }`.

Returns an object with following properties:

- `onclose`

    Can be assigned to a function. If provided, it will be called when the tab opened is closed.

- `closed` *boolean*

    Whether the tab opened is closed.

- `close` *function*

    A function to explicitly close the tab opened.

### GM_registerMenuCommand

Register a command to Violentmonkey popup menu.

```js
GM_registerMenuCommand(caption, func)
```

- `caption` *string*

    The name to show in the popup menu.

- `func` *function*

    The function to execute when clicked in the menu.

If you want to add a shortcut, please see [vm.shortcut](https://github.com/violentmonkey/vm-shortcut).

### GM_unregisterMenuCommand

Unregister a command which has been registered to Violentmonkey popup menu.

```js
GM_unregisterMenuCommand(caption)
```

- `caption` *string*

    The name of command to be unregistered.

### GM_notification

Show a HTML5 desktop notification.

```js
GM_notification(options)
GM_notification(text, title, image, onclick)
```

- `options` *object*

    - `options.text` *string required*

        Main text of the notification.

    - `options.title` *string*

        Title of the notification.

    - `options.image` *string*

        URL of an image to show in the notification.

    - `options.onclick` *function*

        Callback when the notification is clicked by user.

    - `options.ondone` *function*

        Callback when the notification is closed, either by user or by system.

The second usage is compatible with Greasemonkey.

- `text` *string required*
- `title` *string*
- `image` *string*
- `onclick` *function*

### GM_setClipboard

Set data to system clipboard.

```js
GM_setClipboard(data, type)
```

- `data`

    The data to be copied to system clipboard.

- `type` *string*

    The type of data to copy. Default as `text/plain`.

### GM_xmlhttpRequest

Make a request like XMLHttpRequest, with some special capabilities.

```js
GM_xmlhttpRequest(details)
```

- `details`

    An object with following properties:

    - `details.url` *string required*

        URL relative to current page is also allowed.

    - `details.method` *string*

        Default as `GET`.

    - `details.user` *string*

        User for authentication.

    - `details.password` *string*

        Password for authentication.

    - `details.overrideMimetype` *string*

        A Mimetype to specify with the request.

    - `details.headers` *object*

        Some special headers are also allowed:

        - `Cookie`
        - `Host`
        - `Origin`
        - `Referer`
        - `User-Agent`

    - `details.responseType` *string*

        One of `text`, `json`, `blob` and `arraybuffer`. The default value is `text`.

    - `details.timeout` *integer* *v2.9.5+*

        Time to wait for the request, none by default.

    - `details.data` *string | formdata*

        Data to send with the request, usually for `POST` and `PUT` requests.

    - `details.context` *any*

        It can be an object and will be assigned to `context` of the response object.

    - `details.anonymous` *boolean* *v2.10.1+*

        When set to `true`, no cookie will be sent with the request. The default value is `false`.

    - Event handlers:

        - `details.onabort`
        - `details.onerror`
        - `details.onload`
        - `details.onloadend`
        - `details.onprogress`
        - `details.onreadystatechange`
        - `details.ontimeout`

> Note:
>
> - `details.synchronous` is not supported.

Returns an object with following properties:

- `abort` *function*

    A function to abort the request.

The response object will be passed to each event handler, with following properties:

- `status`

    Same as a standard `XMLHttpRequest`.

- `statusText`

    Same as a standard `XMLHttpRequest`.

- `readyState`

    Same as a standard `XMLHttpRequest`.

- `responseHeaders`

    An object of all response headers.

- `responseText`

    Same as a standard `XMLHttpRequest`, only provided when available.

- `finalUrl`

    The final URL after redirection.

- `context`

    The same object passed to the original request.

### GM_download

*v2.9.5+*

Download a URL and save it as a local file.

```js
GM_download(options)
// or
GM_download(url, name)
```

- `options`

    An object with following properties:

    - `options.url` *string required*

        The URL to download.

    - `options.name` *string*

        The filename to save as.

    - `options.onload` *function*

        The function to call when download started successfully.

    Properties below is the same as those for `GM_xmlhttpRequest`:

    - `options.headers` *object*
    - `options.timeout` *integer*
    - `options.onerror` *function*
    - `options.onprogress` *function*
    - `options.ontimeout` *function*
