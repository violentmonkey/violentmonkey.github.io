import React from 'react';
import { graphql } from 'gatsby';
import Layout from '#/components/layout';
import IndexTemplateDetails from '#/components/content-index';

export default function IndexTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, subtitle, menu, footer, copyright,
        },
      },
      markdownRemark: {
        frontmatter: {
          description,
        },
      },
    },
  } = props;
  const siteMeta = {
    title,
    description: description || subtitle,
    menu,
    footer,
    copyright,
  };
  return (
    <Layout {...siteMeta}>
      <IndexTemplateDetails {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
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
      }
    }
    markdownRemark(fields: { slug: { eq: "/" } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`;
