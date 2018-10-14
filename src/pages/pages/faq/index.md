---
title: FAQ
date: 2017-09-22 14:41:11
---

<!--
### Why is Violentmonkey newer on GitHub than AMO?

<details><summary>Because review on AMO takes quite long time, new releases are kept on GitHub.</summary><blockquote
>Review on AMO takes quite long time, maybe a few days for some simple add-ons, but a few months for Violentmonkey.

Violentmonkey is written in ES6 and packed with Webpack. The generated code is quite unreadable even without being compressed, as I was told by the reviewers. So the source code needs to be reviewed each time, making the progress even longer.

As a result, *I decide not to publish new releases on AMO*, and *keep them on GitHub under releases tab*.
</blockquote></details>
-->

### Why does Violentmonkey requires `clipboard` permission?

To make `GM_setClipboard` work on different browsers.

{% more %}
First of all, the required permission is named `clipboardWrite`, which means it just allows writing to clipboard, but not reading from clipboard.

Secondly, there is a function used in userscripts named `GM_setClipboard`. It writes to clipboard, just exactly what `clipboardWrite` allows.

On Chrome, the extension can write to clipboard in the background even without `clipboardWrite` permission. But on Firefox, this won't work without the permission. So `clipboardWrite` permission is required to make the extension work on different browsers.
{% endmore %}

### Why are third-party sync services used instead of native ones?

Because `browser.storage.sync` is designed to sync preferences instead of large data, and it cannot sync data between different browsers. In some browsers there is no such API implemented.

{% more %}
According to [the document](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync), `browser.storage.sync` is designed to store preferences and sync them to different instances of the same browser with the same user logged in. And something more, up to 100KB of data can be stored and synced.

So the limitations are:
1. Up to 100KB of data can be stored, even smaller than size of a feature-rich script.
2. Only sync on the same browser, no share between Chrome and Firefox.

With third-party sync services (Dropbox, Google Drive, etc.):
1. More data can be stored.
2. Scripts can be shared in Chrome, Firefox, Vivaldi, Maxthon, etc. Your scripts are synced to different browsers if only Violentmonkey is installed.
{% endmore %}
