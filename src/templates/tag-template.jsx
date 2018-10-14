import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import TagTemplateDetails from '../components/TagTemplateDetails';

class TagTemplate extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: { title, menu, footer },
        },
      },
      pathContext: { tag },
    } = this.props;
    const siteMeta = {
      title: `All Posts tagged as "${tag}" - ${title}`,
      menu,
      footer,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <TagTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
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
        filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } },
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
