---
title: FAQ
date: 2017-09-22 14:41:11
---

### Why is Violentmonkey newer on GitHub than AMO?

<details><summary>Because review on AMO takes quite long time, new releases are kept on GitHub.</summary><blockquote
>Review on AMO takes quite long time, maybe a few days for some simple add-ons, but a few months for Violentmonkey.

Violentmonkey is written in ES6 and packed with Webpack. The generated code is quite unreadable even without being compressed, as I was told by the reviewers. So the source code needs to be reviewed each time, making the progress even longer.

As a result, *I decide not to publish new releases on AMO*, and *keep them on GitHub under releases tab*.
</blockquote></details>

### Why does Violentmonkey requires `clipboard` permission?

<details><summary>To make `GM_setClipboard` work on different browsers.</summary><blockquote
>First of all, the required permission is named `clipboardWrite`, which means it just allows writing to clipboard, but not reading from clipboard.

Secondly, there is a function used in userscripts named `GM_setClipboard`. It writes to clipboard, just exactly what `clipboardWrite` allows.

On Chrome, the extension can write to clipboard in the background even without `clipboardWrite` permission. But on Firefox, this won't work without the permission. So `clipboardWrite` permission is required to make the extension work on different browsers.
</blockquote></details>
