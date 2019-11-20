import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import PostItem from '../components/post-item';

export default function TagTemplate(props) {
  const {
    pageContext: { tag },
    data: {
      allMarkdownRemark: { edges },
    },
  } = props;
  return (
    <Layout>
      <main>
        <h1>
          {'Tag: '}
          {tag}
        </h1>
        {edges.map(edge => <PostItem data={edge} key={edge.node.fields.slug} />)}
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
        }
        fields: {
          type: { eq: "posts" }
          draft: { ne: true }
        }
      }
      sort: {
        order: DESC
        fields: [frontmatter___date]
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;
