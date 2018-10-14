import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import IndexTemplateDetails from '../components/IndexTemplateDetails';

class IndexTemplate extends React.Component {
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
            description,
          },
        },
      },
    } = this.props;
    const siteMeta = {
      menu,
      title,
      footer,
      description: description || subtitle,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <IndexTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export default IndexTemplate;

export const pageQuery = graphql`
  query {
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
