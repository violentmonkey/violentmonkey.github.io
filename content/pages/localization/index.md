---
title: Localization
date: 2017-03-13 20:07:10
---

There are several ways to help with localization of Violentmonkey.

Pull Requests
---
This way always works and is recommended at the moment.

1. Fork Violentmonkey from [GitHub](https://github.com/violentmonkey/violentmonkey).
1. Copy `src/_locales/en/messages.yml` into `src/_locales/<your_locale>/messages.yml`.
1. Translate messages in the created `messages.yml` or the one you'd like to modify.
   Make sure the modified `messages.yml` is valid yaml.
   If you have Node.js 8+ installed, you can check and reformat it by running `npm run i18n`.
1. Commit changes and create a pull request.

Transifex
---
[![Transifex](https://www.transifex.com/projects/p/violentmonkey-nex/resource/messagesjson/chart/image_png)](https://www.transifex.com/projects/p/violentmonkey-nex/resource/messagesjson/)

More
---
Technically we can have a smarter and more flexible way to localize different
Violentmonkey projects while keeping most of the shared parts but not ready yet.
Any help would be appreciated.
