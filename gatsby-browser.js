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
  const data = collectData(target, {
    action: 'click',
  });
  if (data.category && !data.label) data.label = target.closest('a')?.textContent;
  if (data.label) {
    trackCustomEvent({
      category: data.category,
      action: data.action,
      label: data.label,
      transport: 'beacon',
    });
  }

  const a = target.closest('a');
  const beta = a?.closest('[data-ga-category=webext-beta]');
  if (beta && a.textContent.includes('Firefox')) {
    e.preventDefault();
    installBetaFirefox();
  }
});

async function installBetaFirefox() {
  const { location } = window;
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

function collectData(target, defaults) {
  const fields = new Set(['action', 'category', 'label']);
  const data = {};
  while (target && fields.size) {
    for (const field of fields) {
      const capitalizedField = field[0].toUpperCase() + field.slice(1);
      const key = `ga${capitalizedField}`;
      const value = target.dataset?.[key];
      if (value) {
        fields.delete(key);
        data[field] = value;
      }
    }
    target = target.parentNode;
  }
  return {
    category: 'global',
    ...defaults,
    ...data,
  };
}

export function onRouteUpdate() {
  const target = document.querySelector(':target');
  if (target) {
    const rect = target.getBoundingClientRect();
    const el = document.scrollingElement;
    el.scrollTop = el.scrollTop + rect.top - 70;
  }
}
