import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostsTemplateDetails from '../components/PostsTemplateDetails';

class IndexRoute extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: {
            title, subtitle, menu, footer,
          },
        },
      },
    } = this.props;
    const siteMeta = {
      title,
      description: subtitle,
      menu,
      footer,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <PostsTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export default IndexRoute;

export const pageQuery = graphql`
  query IndexQuery {
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
  }
`;
