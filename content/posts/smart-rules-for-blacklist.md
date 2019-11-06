---
title: Smart rules for blacklist
date: 2017-04-15 21:44:21
category: guide
tags:
  - blacklist
  - exclude
  - match
path: /posts/smart-rules-for-blacklist/
redirect_from: 
  - /2017/04/15/Smart-rules-for-blacklist/
---

Userscripts are injected into web pages according to predefined rules. However, the rules do not always satisfy users for different reasons. In such cases, we need blacklist to exclude some web pages for all scripts.

### Blacklist use cases

- hostnames

  In most cases, we may want to add simply hostnames to exclude.

- `@exclude-match` rules

  Since match patterns are safer to match URLs, we prefer to use `@exclude-match` rules to exclude URLs more flexibly.

- `@exclude` rules

  They are commonly supported by userscripts, so we should just keep them work.

### Blacklist patterns

Taken all use cases into account, the blacklist may have following patterns:

- hostnames

  A string without slashes, e.g. `example.com`, `*.example.com`.

- [match patterns](https://developer.chrome.com/extensions/match_patterns)

  A string with scheme, hostname and pathname patterns, e.g. `*://*/*`, `https://www.google.com/`.

- [`@exclude` rules](https://wiki.greasespot.net/Include_and_exclude_rules)

  A string prefixed with `@exclude `, e.g. `@exclude https://*`.

- comments

  A string starting with `#`, will be ignored.

Here is a full example for blacklist:

```
# hostnames
www.google.com

# @exclude-match rules
*://twitter.com/*

# @exclude rules
@exclude https://example.com/*
```

### Whitelist patterns

For some people who want to disable Violentmonkey for most websites, a whitelist is needed.

To work as a whitelist, we can use following patterns:

- [`@match` rules](https://developer.chrome.com/extensions/match_patterns)

  A string prefixed with `@match `, and followed by a match pattern, e.g. `@match https://www.google.com/*`.

- [`@include` rules](https://wiki.greasespot.net/Include_and_exclude_rules)

  A string prefixed with `@include `, e.g. `@include https://*`.

If any of the rules above are matched, the URL bypasses the blacklist.
To make it a whitelist, we should block all other URLs by a rule at the end: `*`.

Here is a full example for whitelist:

```
# match rules
@match https://www.google.com/*

# include rules
@include https://example.com/*

# block everything else
*
```
