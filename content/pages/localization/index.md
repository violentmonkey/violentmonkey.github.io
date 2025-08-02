---
title: Localization
date: 2017-03-13 20:07:10
---

It is highly recommended to update the translations on [Transifex](https://www.transifex.com/), to utilize the powerful features provided by the platform and for better maintenance.

We have automated weekly synchronization from Transifex, so the translations will be updated to the code soon.

## Transifex (Recommended)

[👉🏻 Start translating or fix an existing translation.
](https://www.transifex.com/violentmonkey/violentmonkey-nex/)

## Pull Requests

_Please consider using Transifex first._

1. Fork Violentmonkey from [GitHub](https://github.com/violentmonkey/violentmonkey).
1. Copy `src/_locales/en/messages.yml` into `src/_locales/<your_locale>/messages.yml`.
1. Translate messages in the created `messages.yml` or the one you'd like to modify.

   > [!IMPORTANT]
   >
   > **Make sure the modified `messages.yml` is valid yaml.**
   >
   > If you are not sure how to do this, please use Transifex instead.

1. Commit changes and create a pull request.
