import { Link, StaticQuery, graphql } from 'gatsby';
import React, { useMemo } from 'react';

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
    <aside className="sidebar">
      {items && (
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <Link
                to={item.node.fields.slug}
                activeClassName="active"
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
