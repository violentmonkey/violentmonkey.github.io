import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import './style.css';

function Footer(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          copyright,
          footer,
        },
      },
    },
  } = props;
  return (
    <footer className="footer d-flex">
      <div>
        Violentmonkey
        {' '}
        {copyright}
      </div>
      <div className="flex-auto" />
      {footer.map(item => (
        <Link
          className="footer-link-item"
          key={item.path}
          to={item.path}
        >
          {item.label}
        </Link>
      ))}
    </footer>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            copyright
            footer {
              label
              path
            }
          }
        }
      }
    `}
    render={data => <Footer {...props} data={data} />}
  />
);
