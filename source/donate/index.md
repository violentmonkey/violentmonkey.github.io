---
title: Donate
date: 2017-03-13 18:26:46
---

- Did you enjoy surfing the Internet with Violentmonkey?
- Yes, I do. And ...

Wanna buy me a coffee?

{% raw %}
<link rel="stylesheet" href="donate.css">
<script src="donate.js"></script>
<div id="vm-donate"></div>
<script>
donate.initDonate({
  el: '#vm-donate',
  logo: {
    image: '/static/vm.png',
    text: 'Donate',
  },
  paypal: {
    image: 'paypal.svg',
    account: 'gera2ld@163.com',
  },
  alipay: {
    image: 'alipay.svg',
    qrcode: 'qr_alipay.png',
  },
  wechatpay: {
    image: 'wechat.svg',
    qrcode: 'qr_wechat.png',
  },
});
</script>
{% endraw %}
