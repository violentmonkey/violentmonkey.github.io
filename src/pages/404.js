import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default function NotFoundRoute(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, menu, footer, copyright,
        },
      },
    },
  } = props;
  const siteMeta = {
    menu,
    footer,
    copyright,
    title: `Not Found - ${title}`,
  };
  return (
    <Layout {...siteMeta}>
      <div className="content">
        <div className="page">
          <h1 className="page-title">NOT FOUND</h1>
          <div className="page-body">
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query NotFoundQuery {
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
  }
`;
