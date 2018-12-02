import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import TagTemplateDetails from '../components/content-tag';

export default function TagTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, menu, footer, copyright,
        },
      },
    },
    pageContext: { tag },
  } = props;
  const siteMeta = {
    title: `All Posts tagged as "${tag}" - ${title}`,
    menu,
    footer,
    copyright,
  };
  return (
    <Layout {...siteMeta}>
      <TagTemplateDetails {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
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
