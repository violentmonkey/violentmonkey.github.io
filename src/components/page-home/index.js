import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import logo from '#/assets/vm.png';
import styles from './style.module.css';

const capitalize = str => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

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
          actions,
          subtitle,
        },
      },
    },
  } = props;
  const renderLink = (item, i) => {
    const className = styles[`button${capitalize(item.type)}`];
    if (item.url.includes('://')) {
      return (
        <a
          key={i}
          className={className}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      );
    }
    return (
      <Link
        key={i}
        className={className}
        to={item.url}
      >
        {item.title}
      </Link>
    );
  };
  return (
    <main>
      <section className={styles.header}>
        <picture>
          <img src={logo} />
        </picture>
        <h1>{title}</h1>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.buttons}>
          {actions.map(renderLink)}
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
          }
        }
        markdownRemark(fields: { slug: { eq: "/" } }) {
          html
          frontmatter {
            subtitle
            actions {
              title
              url
              type
            }
          }
        }
      }
    `}
    render={data => <IndexContent {...props} data={data} />}
  />
);
