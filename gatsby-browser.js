import WebFont from 'webfontloader';
import 'prismjs/themes/prism.css';

WebFont.load({
  google: {
    families: ['Roboto:400,400i,500,700'],
  },
});

window.gitter = {
  chat: {
    options: {
      room: 'violentmonkey/violentmonkey',
    },
  },
};
const s = document.createElement('script');
s.src = 'https://sidecar.gitter.im/dist/sidecar.v1.js';
document.body.append(s);
