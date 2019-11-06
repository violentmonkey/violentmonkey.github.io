import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import PostItem from '../components/post-item';

export default function CategoryTemplate(props) {
  const {
    pageContext: {
      category,
    },
    data: {
      allMarkdownRemark: {
        edges,
      },
    },
  } = props;
  return (
    <Layout>
      <main>
        <h1>
          {'Category: '}
          {category}
        </h1>
        {edges.map(edge => <PostItem data={edge} key={edge.node.fields.slug} />)}
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { category: { eq: $category }, type: { eq: "post" }, draft: { ne: true } } },
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
