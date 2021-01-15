import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import ScrollIndicator from '#/components/scroll-indicator';

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
      <Header
        {...props}
        data={data}
      />
    )}
  />
);
