import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PageTemplateDetails from '../components/PageTemplateDetails';

class PageTemplate extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: {
            title, subtitle, menu, footer,
          },
        },
        markdownRemark: {
          frontmatter: {
            title: pageTitle,
            description,
          },
        },
      },
    } = this.props;
    const siteMeta = {
      menu,
      title: `${pageTitle} - ${title}`,
      description: description || subtitle,
      footer,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <PageTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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
