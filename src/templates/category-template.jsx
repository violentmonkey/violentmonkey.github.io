import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

class CategoryTemplate extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: { title, menu, footer },
        },
      },
      pathContext: { category },
    } = this.props;
    const siteMeta = {
      title: `${category} - ${title}`,
      menu,
      footer,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <CategoryTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
        subtitle
        menu {
          label
          path
        }
        footer {
          label
          path
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
