import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '#/components/layout';

export default function CategoriesRoute(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title,
        },
      },
      allMarkdownRemark: { group },
    },
  } = props;
  return (
    <Layout>
      <Helmet>
        <title>{`All Categories - ${title}`}</title>
      </Helmet>
      <main>
        <h1>Categories</h1>
        <ul>
          {group.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue}
                {' '}
                (
                {category.totalCount}
                )
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query CategoryesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { type: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
