---
title: Inject scripts with Blob URLs
date: 2017-10-28 13:48:00
category: update
tags:
  - inject
  - blob
path: "/2017/10/28/Inject-scripts-with-BLOB-URLs/"
---

Since Violentmonkey v2.8.15, scripts are injected with Blob URLs instead of `textContent` in v2.8.13-. Thanks to [evilpie](https://github.com/evilpie), see [#246](https://github.com/violentmonkey/violentmonkey/pull/246).

### Before

In earlier versions, scripts are injected like this:

```javascript
const s = document.createElement('script');
s.textContent = script;
document.body.appendChild(s);
document.body.removeChild(s);
```

This way works well on Chrome but does not work on Firefox 57- when page has a limit on inline script by CSP. See [bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1267027).

### Now

Since Firefox 58, we have a workaround by injecting scripts like this:

```javascript
const b = new Blob([script], { type: 'text/javascript' });
const u = URL.createObjectURL(b);
const s = document.createElement('script');
s.src = u;
document.body.appendChild(s);
document.body.removeChild(s);
URL.revokeObjectURL(u);
```

Using Blob URLs instead of `textContent`, scripts can be injected to pages on Firefox 58+ too.

### Problem

Then we encountered a problem (v2.8.14, [#249](https://github.com/violentmonkey/violentmonkey/issues/249)): sometimes the scripts are not injected at all. After debugging for a while, I figured out what was happening.

First let's take a look at the injection procedure:
1. inject an initializer to context of page script
1. load userscripts from content script
1. post userscripts to the initializer through custom events
1. execute userscripts

The problem is, when the userscripts are loaded and posted to the initializer, the initializer may be not ready yet. As a result, the posted userscripts are discarded.

But why won't this happen before?

Because the `textContent` way is synchronous while the `src` way is asynchronous.

Using the `textContent` way, the initializer is initialized synchronously when injected. So the initializer is always ready when the userscripts are loaded.

But when using a Blob URL, the injection becomes asynchronous. Because it has to fetch the real content first. So the initializer may be not ready yet when the userscripts are laoded. Consequently, no userscript is injected.

Here is a demonstration:

```javascript
{
  const s = document.createElement('script');
  s.textContent = 'console.log(1)';
  document.body.appendChild(s);
  document.body.removeChild(s);
}

{
  const s = document.createElement('script');
  const b = new Blob(['console.log(2)'], { type: 'text/javascript' });
  const u = URL.createObjectURL(b);
  s.src = u;
  document.body.appendChild(s);
  document.body.removeChild(s);
  URL.revokeObjectURL(u);
}

console.log(3);
```

By running the code above in a browser (e.g. Chrome), we got output as below:

```
1
3
2
```

### Conclusion

So we just need to ensure that the initializer is ready when posting userscripts to it.

Finally, it works on Chrome any and Firefox v58+, even on pages with CSP limitations.
