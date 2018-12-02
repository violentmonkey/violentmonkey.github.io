import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import IndexContent from '../components/content-posts';

export default function IndexRoute(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title, subtitle, menu, footer, copyright,
        },
      },
    },
  } = props;
  const siteMeta = {
    title,
    subtitle,
    menu,
    footer,
    copyright,
  };
  return (
    <Layout {...siteMeta}>
      <IndexContent {...props} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
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
