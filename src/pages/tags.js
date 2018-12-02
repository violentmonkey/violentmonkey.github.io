import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/layout';

export default function TagsRoute(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, menu, footer, copyright,
        },
      },
      allMarkdownRemark: { group },
    },
  } = props;
  const siteMeta = {
    menu,
    footer,
    copyright,
    title: `All Tags - ${title}`,
  };
  return (
    <Layout {...siteMeta}>
      <div className="content">
        <div className="page">
          <h1 className="page-title">Tags</h1>
          <div className="page-body">
            <div className="tags">
              <ul className="tags-list">
                {group.map(tag => (
                  <li key={tag.fieldValue} className="tags-list-item">
                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className="tags-list-item-link">
                      {tag.fieldValue}
                      {' '}
                      (
                      {tag.totalCount}
                      )
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        footer {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
