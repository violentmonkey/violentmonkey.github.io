import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import ScrollIndicator from '#/components/scroll-indicator';
import styles from './style.module.css';

function Header(props) {
  const { data } = props;
  return (
    <header>
      <nav className="d-flex">
        <Link to="/" className={styles.brand}>
          Violentmonkey
        </Link>
        <span className="flex-auto" />
        {data.site.siteMetadata.menu.map(item => (
          <Link key={item.path} to={item.path} className={styles.link} activeClassName="active">
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
