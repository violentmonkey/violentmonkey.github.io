import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import logo from '#/assets/vm.png';

function IndexContent(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title,
        },
      },
      markdownRemark: {
        html,
        frontmatter: {
          subtitle,
        },
      },
    },
  } = props;
  return (
    <main>
      <section className="mt-20 text-center">
        <picture className="block w-24 mx-auto">
          <img className="block w-full" src={logo} />
        </picture>
        <h1 className="mt-8">{title}</h1>
        <h3 className="mt-8 text-gray-600">{subtitle}</h3>
      </section>
      <section>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </main>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        markdownRemark(fields: { slug: { eq: "/" } }) {
          html
          frontmatter {
            subtitle
          }
        }
      }
    `}
    render={data => <IndexContent {...props} data={data} />}
  />
);
