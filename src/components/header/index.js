import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import ScrollIndicator from '#/components/scroll-indicator';
import styles from './style.module.css';

function Header(props) {
  const { data, onToggle } = props;
  return (
    <header>
      <nav className="d-flex">
        <a className={styles.toggle} onClick={onToggle}><i /></a>
        <Link to="/" className={styles.brand}>
          Violentmonkey
        </Link>
        <span className="flex-1" />
        {data.site.siteMetadata.menu.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={styles.link}
            activeClassName="active"
            partiallyActive
          >
            {item.label}
          </Link>
        ))}
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
