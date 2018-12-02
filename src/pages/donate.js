import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Donate from '../components/donate';

export default function DonatePage(props) {
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
    menu,
    footer,
    copyright,
    title,
    description: description || subtitle,
  };
  return (
    <Layout {...siteMeta}>
      <Donate />
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
