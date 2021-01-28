import React, { useEffect, useState } from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import ScrollIndicator from '#/components/scroll-indicator';

const hiring = 'https://cdn.jsdelivr.net/gh/gxcl/x@master/hiring.js';

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.onerror = reject;
    document.body.append(s);
    s.remove();
  });
}

async function loadBanner() {
  await loadScript(hiring);
  const html = await window.initializeBanner?.();
  return html;
}

function Banner() {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    loadBanner().then(html => {
      if (html) {
        setBanner(html);
        trackCustomEvent({
          category: 'banner',
          action: 'show',
          label: 'show',
          transport: 'beacon',
        });
      }
    });
  }, []);
  const handleClose = () => {
    setBanner(null);
  };
  if (!banner) return null;
  return (
    <div className="bg-orange-200 px-4 text-sm flex" data-ga-category="banner">
      <div className="flex-1" dangerouslySetInnerHTML={{ __html: banner }} />
      <div onClick={handleClose} className="cursor-pointer text-gray-600" data-ga-label="hide">
        ✗
      </div>
    </div>
  );
}

function Header(props) {
  const { data, onToggle } = props;
  return (
    <header className="sticky top-0 left-0 right-0 bg-white z-10">
      <nav>
        <a className="toggle" onClick={onToggle}>
          <svg viewBox="0 0 24 24">
            <path d="M0 0h24v4h-24zM0 10h24v4h-24zM0 20h24v4h-24z" />
          </svg>
        </a>
        <Link to="/" className="brand">
          Violentmonkey
        </Link>
        <span className="flex-1" />
        <div className="overflow-auto min-w-0 flex whitespace-no-wrap">
          {data.site.siteMetadata.menu.map(item => (
            <Link
              className="nav-item"
              key={item.path}
              to={item.path}
              activeClassName="active"
              partiallyActive
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <ScrollIndicator />
    </header>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            menu {
              label
              path
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Banner />
        <Header
          {...props}
          data={data}
        />
      </>
    )}
  />
);
