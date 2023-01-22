import WebFont from 'webfontloader';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import 'prismjs/themes/prism.css';

WebFont.load({
  google: {
    families: ['Roboto:400,400i,500,700'],
  },
});

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
  const category = target.closest('[data-ga-category]')?.dataset.gaCategory;
  const action = target.closest('[data-ga-action]')?.dataset.gaAction;
  const label = target.closest('[data-ga-label]')?.dataset.gaLabel;
  return {
    category: 'global',
    ...defaults,
    ...category && { category },
    ...action && { action },
    ...label && { label },
  };
}

export function onRouteUpdate() {
  const { hash } = window.location;
  let target;
  try {
    target = hash && document.querySelector(hash);
  } catch {
    // ignore
  }
  if (target) {
    const rect = target.getBoundingClientRect();
    const el = document.scrollingElement;
    el.scrollTop = el.scrollTop + rect.top - 70;
  }
}
