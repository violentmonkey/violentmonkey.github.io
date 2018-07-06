---
title: Matching
date: 2017-12-2 22:32:50
---

There are four types of rules: `@match` / `@exclude-match` / `@include` / `@exclude` in Violentmonkey.

@match / @exclude-match
---

It is recommended to use `@match` / `@exclude-match` rather than `@include` / `@exclude` because the *match* rules are safer and more strict.

`@match` defines a URL matching rule. `@exclude-match` defines a match rule but used to exclude the matched URLs, similar to `@exclude`.

For more details, see the document on [Match Patterns](https://developer.chrome.com/extensions/match_patterns) for Chrome extensions.

Note that match patterns only work on scheme, host and path, i.e. match patterns always ignore query string and hash.

Examples:

```js
// @match *://*/*
// @exclude-match *://*.tk/*
```

@include / @exclude
---

Each `@include` and `@exclude` rule can be the following:

- A string with one or more wildcards (`*`), each of which matches any characters.

  e.g. `https://www.google.com/*` matches the following:
  - `https://www.google.com/`
  - `https://www.google.com/any/subview`

  but not the following:
  - `http://www.google.com/`
  - `https://www.google.com.hk/`

- A string without any wildcard. This way the rule matches the entire URL.

  e.g. `https://www.google.com/` matches only `https://www.google.com/` but not `https://www.google.com/any/subview`.

- A string starting and ending with a slash (`/`). This way the rule will be regarded as a regular expression.

  e.g. `/\.google\.com[\.\/]/` matches the following:
  - `https://www.google.com/`,
  - `https://www.google.com/any/subview`
  - `http://www.google.com/`
  - `https://www.google.com.hk/`

Examples:

```js
// @include *
// @include https://www.google.com/*
// @include /\.com\.hk\//
// @exclude https://www.google.com/exact/url
```

How does a script match?
---

In short, a script will execute if it matches any `@match` or `@include` rule and does not match any `@exclude-match` or `@exclude` rule.

Here is the long version:

- If any `@exclude-match` or `@exclude` rule matches, the script does not match.
- Otherwise if any `@match` rule is defined, the script matches only if some of the `@match` rules match.
- If no `@match` rule is defined, we fallback to `@include` rules and the script matches only if some of the `@include` rules match.
- If neither `@match` nor `@include` rule is defined, the script is assumed to match.

![match.png](match.png)
