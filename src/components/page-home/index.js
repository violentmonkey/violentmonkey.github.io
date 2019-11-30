import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import logo from '#/assets/vm.png';
import styles from './style.module.css';

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
    <main>
      <section className={styles.header}>
        <picture>
          <img src={logo} />
        </picture>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div className={styles.buttons}>
          <Link to="/get-it/">Get it!</Link>
          <Link to="/donate/">Donate</Link>
          <a href="https://github.com/violentmonkey/violentmonkey" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
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
