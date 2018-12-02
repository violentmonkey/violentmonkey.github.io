import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageTemplateDetails from '../components/content-page';

export default function PageTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, subtitle, menu, footer, copyright,
        },
      },
      markdownRemark: {
        frontmatter: {
          title: pageTitle,
          description: pageDescription,
        },
      },
    },
  } = props;
  const siteMeta = {
    title: `${pageTitle} - ${title}`,
    description: pageDescription !== null ? pageDescription : subtitle,
    menu,
    footer,
    copyright,
  };
  return (
    <Layout {...siteMeta}>
      <PageTemplateDetails {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
