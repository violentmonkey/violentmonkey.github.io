import React, { useEffect, useState } from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { SidebarContainer } from '#/common/sidebar';
import ScrollIndicator from '#/components/scroll-indicator';

const hiring = 'https://cdn.jsdelivr.net/gh/gxcl/x@master/hiring.min.js';

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
  const { items, toggle } = SidebarContainer.useContainer();
  const { data } = props;
  const onToggle = (e) => {
    e.stopPropagation();
    toggle();
  };
  return (
    <header className="sticky top-0 left-0 right-0 bg-white z-10">
      <nav>
        <Link to="/" className="nav-icon sm:hidden">
          <svg viewBox="0 0 24 24">
            <path d="M12 0l-12 12h4v12h5v-8h6v8h5v-12h4z" />
          </svg>
        </Link>
        {items && (
          <a className="nav-icon lg:hidden" onClick={onToggle}>
            <svg viewBox="0 0 24 24">
              <path d="M0 2h24v4h-24zM0 10h24v4h-24zM0 18h24v4h-24z" />
            </svg>
          </a>
        )}
        <Link to="/" className="brand hidden sm:block">
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
