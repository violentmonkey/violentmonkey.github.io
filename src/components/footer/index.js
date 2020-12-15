import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

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
    <footer className="flex mt-10 p-6 pb-16 border-t border-gray-400 lg:pb-6">
      <div>
        Violentmonkey
        {' '}
        {copyright}
      </div>
      {footer.map(item => (
        <Link
          className="mx-2"
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
