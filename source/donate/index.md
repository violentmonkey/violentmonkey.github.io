---
title: Donate
date: 2017-03-13 18:26:46
---

- Did you enjoy surfing the Internet with Violentmonkey?
- Yes, I do. And ...

Wanna buy me a coffee?

{% raw %}
<link rel="stylesheet" href="assets/donate.css">
<script src="assets/donate.js"></script>
<div id="vm-donate"></div>
<script>
donate.initDonate({
  el: '#vm-donate',
  logo: {
    image: '/static/vm.png',
    text: 'Donate',
  },
  entries: [{
    type: 'url',
    text: 'PayPal',
    image: 'assets/paypal.svg',
    url: 'https://www.paypal.me/gera2ld/5',
  }, {
    type: 'qrcode',
    text: 'AliPay',
    image: 'assets/alipay.svg',
    qrcode: 'assets/qr_alipay.png',
  }, {
    type: 'qrcode',
    text: 'WeChat Pay',
    image: 'assets/wechat.svg',
    qrcode: 'assets/qr_wechat.png',
  }],
});
</script>
{% endraw %}
