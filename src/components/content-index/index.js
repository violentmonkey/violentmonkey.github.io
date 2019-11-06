import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import logo from '#/assets/vm.png';
import './style.css';

function IndexContent(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, subtitle,
        },
      },
      markdownRemark: {
        html,
      },
    },
  } = props;
  return (
    <main className="page-index">
      <section className="page-index-header">
        <picture className="page-index-logo">
          <img src={logo} />
        </picture>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div className="page-index-buttons">
          <Link to="/get-it/">Get it!</Link>
          <Link to="/donate/">Donate</Link>
          <a href="https://github.com/violentmonkey/violentmonkey" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </section>
      <div className="page-index-body" dangerouslySetInnerHTML={{ __html: html }} />
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
            subtitle
          }
        }
        markdownRemark(fields: { slug: { eq: "/" } }) {
          html
        }
      }
    `}
    render={data => <IndexContent {...props} data={data} />}
  />
);
