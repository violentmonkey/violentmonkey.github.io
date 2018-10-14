import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostTemplateDetails from '../components/PostTemplateDetails';

class PostTemplate extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: { title, subtitle, menu },
        },
        markdownRemark: {
          frontmatter: {
            title: postTitle,
            description,
          },
        },
      },
    } = this.props;
    const siteMeta = {
      menu,
      title: `${postTitle} - ${title}`,
      description: description || subtitle,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <PostTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        disqusShortname
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`;
