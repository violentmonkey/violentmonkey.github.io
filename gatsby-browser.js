import WebFont from 'webfontloader';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
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

document.addEventListener('click', e => {
  let { target } = e;
  const category = target.closest('[data-ga-category]')?.dataset.gaCategory;
  let label = target.closest('[data-ga-label]')?.dataset.gaLabel;
  if (category && !label) label = target.closest('a')?.textContent;
  if (label) {
    trackCustomEvent({
      category: category || 'global',
      action: 'click',
      label,
      transport: 'beacon',
    });
  }
});
