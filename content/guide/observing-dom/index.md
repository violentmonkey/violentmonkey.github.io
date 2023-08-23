---
title: Observing DOM
date: 2021-02-17 23:16:49+0800
sidebar:
  match: /guide/
  order: 2
---

import { InfoBox } from '@/components/box';

## Background

It is a common case to operate on elements that are created dynamically, which may not be ready even on `document-end`.

In earlier userscripts we can see authors using timers to detect DOM elements periodically, which works in most browsers but is less effective, and there is likely obvious lag after the elements appear and before the operations are performed.

A better way to do stuff when certain element is ready is to use [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) instead of timers. `MutationObserver` is well supported in modern browsers, including those Violentmonkey works on, as defined [here](https://github.com/violentmonkey/violentmonkey/blob/master/.browserslistrc).

You can stop reading this now if you are familiar with `MutationObserver` and prefer native APIs.

## Introducing @violentmonkey/dom

If you are looking for an easy and friendly way to observe elements, [@violentmonkey/dom][vm-dom] might be what you want.

<InfoBox>
  [@violentmonkey/dom][vm-dom] is a library provided by the Violentmonkey team. Nevertheless, it is just pure JavaScript and can be used with other script managers.
</InfoBox>

Once the library is required, we can use its methods under the `VM` namespace. See [the documentation](https://www.jsdocs.io/package/@violentmonkey/dom) for more details.

## Requirements

Add `@violentmonkey/dom` to the [meta block](/api/metadata-block/) of your script:

```js {3}
// ==UserScript==
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==
```

If the project is initiated from [our generator](https://github.com/violentmonkey/generator-userscript), it's likely that the dependency is already included.

## Observing

After preparing the requirements, we can observe elements by `VM.observe` ([doc](https://www.jsdocs.io/package/@violentmonkey/dom#observe)), which utilizes `MutationObserver` under the hood.

For example, prepend `<h1>Profile</h1>` to the dynamically created `<div class="profile">`:

```js
const disconnect = VM.observe(document.body, () => {
  // Find the target node
  const node = document.querySelector('.profile');

  if (node) {
    const h1 = document.createElement('h1');
    h1.textContent = 'Profile';
    node.prepend(h1);

    // disconnect observer
    return true;
  }
});

// You can also disconnect the observer explicitly when it's not used any more
disconnect();
```

Note that `return true` in the end is needed to disconnect the observer once we find the target node. Otherwise the detection continues and makes useless callbacks.

To observe `document.body` we must make sure `document.body` exists. This should not be a problem if `@run-at` is omitted or set to a value other than `document-start`.

## (Optionally) Using jQuery

This is not recommended though, we put it here just in case some people are big fans of jQuery.

It is quite simple to integrate jQuery with the observer. Before we begin we must include jQuery as a dependency:

```js {4}
// ==UserScript==
// ...
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// @require https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// ==/UserScript==
```

Then we can wrap the node with jQuery and operate it the jQuery way:

```js
VM.observe(document.body, () => {
  // Find the target node
  const $node = $('.profile');

  if ($node.length) {
    $node.prepend('<h1>Profile</h1>');

    // disconnect observer
    return true;
  }
});
```

[vm-dom]: https://github.com/violentmonkey/vm-dom
