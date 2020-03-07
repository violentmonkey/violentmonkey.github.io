import { graphql } from 'gatsby';
import React from 'react';
import IndexPage from '#/components/index-page';

export default function PostsPage(props) {
  return (
    <IndexPage {...props} />
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
