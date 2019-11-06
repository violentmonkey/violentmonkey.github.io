import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import logo from '#/assets/vm.png';
import './style.css';

function Header(props) {
  const { data } = props;
  return (
    <header>
      <nav className="d-flex">
        <Link to="/" className="logo">
          <img src={logo} />
        </Link>
        <div className="flex-spacer" />
        {data.site.siteMetadata.menu.map(item => (
          <Link key={item.path} to={item.path} className="nav-link" activeClassName="active">
            {item.label}
          </Link>
        ))}
      </nav>
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
