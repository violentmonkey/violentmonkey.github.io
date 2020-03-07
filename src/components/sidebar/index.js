import { Link, StaticQuery, graphql } from 'gatsby';
import React, { useMemo } from 'react';
import styles from './style.module.css';

function Sidebar(props) {
  const {
    active,
    data: {
      allMarkdownRemark: {
        edges,
      },
    },
  } = props;
  const items = useMemo(() => {
    if (!active?.match) return;
    return edges.filter(edge => edge.node.frontmatter.sidebar?.match === active.match)
    .sort((a, b) => a.node.frontmatter.sidebar.order - b.node.frontmatter.sidebar.order);
  }, [active?.match]);
  return (
    <aside className={styles.sidebar}>
      {items && (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <Link
                to={item.node.fields.slug}
                activeClassName={styles.active}
              >
                {item.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                sidebar {
                  match
                  order
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => <Sidebar {...props} data={data} />}
  />
);
