import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

class NotFoundRoute extends React.Component {
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
      menu,
      title,
      description: subtitle,
      footer,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">NOT FOUND</h1>
              <div className="page__body">
                <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NotFoundRoute;

export const pageQuery = graphql`
  query NotFoundQuery {
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
