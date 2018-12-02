import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/layout';

export default function CategoriesRoute(props) {
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
    title: `All Categories - ${title}`,
  };
  return (
    <Layout {...siteMeta}>
      <div className="content">
        <div className="page">
          <h1 className="page-title">Categories</h1>
          <div className="page-body">
            <div className="categories">
              <ul className="categories-list">
                {group.map(category => (
                  <li key={category.fieldValue} className="categories-list-item">
                    <Link to={`/categories/${kebabCase(category.fieldValue)}/`} className="categories-list-item-link">
                      {category.fieldValue}
                      {' '}
                      (
                      {category.totalCount}
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
  query CategoryesQuery {
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
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
