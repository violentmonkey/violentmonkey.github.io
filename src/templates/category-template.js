import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CategoryTemplateDetails from '../components/content-category';

export default function CategoryTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, menu, footer, copyright,
        },
      },
    },
    pageContext: { category },
  } = props;
  const siteMeta = {
    menu,
    footer,
    copyright,
    title: `${category} - ${title}`,
  };
  return (
    <Layout {...siteMeta}>
      <CategoryTemplateDetails {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
        limit: 1000,
        filter: { frontmatter: { category: { eq: $category }, layout: { eq: "post" }, draft: { ne: true } } },
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
