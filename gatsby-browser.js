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
  const { target } = e;

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

  const action = target.closest('[data-action]')?.dataset.action;
  if (action === 'install-beta-ff') {
    e.preventDefault();
    installBetaFirefox();
  }
});

async function installBetaFirefox() {
  try {
    const res = await fetch('https://api.github.com/repos/violentmonkey/violentmonkey/releases');
    const data = await res.json();
    const latestBeta = data.find(item => item.prerelease);
    const xpi = latestBeta.assets.find(item => item.name.endsWith('.xpi'));
    location.assign(xpi.browser_download_url);
  } catch {
    location.assign('https://github.com/violentmonkey/violentmonkey/releases');
  }
}
