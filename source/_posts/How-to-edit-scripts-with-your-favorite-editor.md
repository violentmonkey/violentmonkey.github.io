---
title: How to edit scripts with your favorite editor?
date: 2017-03-14 14:37:09
tags:
  - editor
  - crx
  - nex
  - oex
  - mx
---

For anyone who uses Violentmonkey, it is easy to find a way to edit a script like this:

{% asset_img editor-1.png %}

However, it is really hard to make everyone love it. *A* probably likes a theme of `monokai`, while *B* prefers `eclipse`. *C* might use 2 spaces for indentation while *D* prefers tabs.

It is impossible to satisfy every single user. Lots of configurations may be added for this, but are they really worth it? A user would have to face lots of choices before he could use it just as a script manager, or have to look for a simple option among lots of unrelated editor options. What is worse, the browser may inhibit some shortcuts or operations that a local editor can have. In other words, an editor inside Violentmonkey will never be as good as your favorite one.

Here comes the question: How to edit my script with my favorite editor?

Save to a file
---

First, copy the script to your favorite editor and save it to a file.

{% asset_img editor-2.png %}

VIM is my favorite editor, and the script is saved at `D:/Source/vm-script.user.js`. Note that the script file must have a name ending with `.user.js`, otherwise won't be recognized by Violentmonkey.

Drag into the browser
---

Drag the file into the browser. If it is named with a suffix of `.user.js`, it will be recognized by Violentmonkey and loaded in the confirmation page.

{% asset_img editor-3.png %}

Make sure the `track local file` option is checked and then confirm installation.

{% asset_img editor-4.png %}

Edit and sync
---

After installation, the confirmation page will keep watching the file before the page is closed. Once the file is changed, the new version will be installed automatically. As a result, you edit the script in your favorite editor, and the changes are synced to Violentmonkey immediately.

{% asset_img editor-5.png %}
