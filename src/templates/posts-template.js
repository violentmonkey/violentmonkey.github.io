import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import PostItem from '../components/post-item';

export default function PostsTemplate(props) {
  const {
    data: {
      allMarkdownRemark: {
        edges,
      },
    },
  } = props;
  return (
    <Layout>
      <main>
        <h1>Posts</h1>
        {edges.map(edge => <PostItem data={edge} key={edge.node.fields.slug} />)}
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { type: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
