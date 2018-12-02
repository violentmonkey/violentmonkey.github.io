import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostTemplateDetails from '../components/content-post';

export default function PostTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, subtitle,
        },
      },
      markdownRemark: {
        frontmatter: {
          title: postTitle,
          description: postDescription,
        },
      },
    },
  } = props;
  const siteMeta = {
    title: `${postTitle} - ${title}`,
    description: postDescription !== null ? postDescription : subtitle,
  };
  return (
    <Layout {...siteMeta}>
      <PostTemplateDetails {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        author {
          name
          twitter
        }
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
