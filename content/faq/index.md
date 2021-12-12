---
title: FAQ
date: 2017-09-22 14:41:11
---

### Why does Violentmonkey require `clipboard` permission?

To make `GM_setClipboard` work on different browsers.

First of all, the required permission is named `clipboardWrite`, which means it just allows writing to clipboard, but not reading from clipboard.

Secondly, there is a function used in userscripts named `GM_setClipboard`. It writes to clipboard, just exactly what `clipboardWrite` allows.

On Chrome, the extension can write to clipboard in the background even without `clipboardWrite` permission. But on Firefox, this won't work without the permission. So `clipboardWrite` permission is required to make the extension work on different browsers.

### Why are third-party sync services used instead of native ones?

Because `browser.storage.sync` is designed to sync preferences instead of large data, and it cannot sync data between different browsers. In some browsers there is no such API implemented.

According to [the document](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync), `browser.storage.sync` is designed to store preferences and sync them to different instances of the same browser with the same user logged in. And something more, up to 100KB of data can be stored and synced.

So the limitations are:
1. Up to 100KB of data can be stored, even smaller than size of a feature-rich script.
2. Only sync on the same browser, no share between Chrome and Firefox.

With third-party sync services (Dropbox, Google Drive, etc.):
1. More data can be stored.
2. Scripts can be shared in Chrome, Firefox, Vivaldi, Maxthon, etc. Your scripts are synced to different browsers if only Violentmonkey is installed.

### Where are the userscripts stored?

They are stored in the [local storage area](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local) of the browser extension. The storage may have different implementations in different browsers, so we can't tell exactly where or in what format is the data stored.

In other words, you won't be able to find your scripts as normal files in your disk. They may be stored in some database maintained by the browser you use.

### Why is the release minified?

The short answer for this question is to make the code clean and efficient.

To be clear, our extension is minified but not obfuscated in release. It is a very common workflow to compile and minify code for web apps, and we are using popular tools that are used all over the world. See [this post](/posts/violentmonkey-workflows/) to learn more about the workflows.
