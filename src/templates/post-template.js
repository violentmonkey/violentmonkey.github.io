import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import React from 'react';

import PostMain from '#/components/post-main';

export default function PostTemplate(props) {
  const {
    data,
  } = props;
  const {
    site: {
      siteMetadata: { title },
    },
    markdownRemark: post,
  } = data;
  const {
    frontmatter: {
      title: postTitle,
    },
  } = post;

  return (
    <>
      <Helmet defer={false}>
        <title>{`${postTitle} - ${title}`}</title>
      </Helmet>
      <PostMain data={data} />
    </>
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
        type
      }
      frontmatter {
        title
        tags
        date
        sidebar {
          match
          order
        }
      }
      tableOfContents
    }
  }
`;
