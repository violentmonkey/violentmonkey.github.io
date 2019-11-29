import { graphql } from 'gatsby';
import React from 'react';
import IndexPage from '#/components/index-page';
import Layout from '#/components/layout';

export default function PostsPage(props) {
  return (
    <Layout>
      <IndexPage {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostsByType($type: String!) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        fields: {
          type: { eq: $type }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`;
