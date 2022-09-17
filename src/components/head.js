import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import icon from '@/assets/vm.png';

export function Head() {
  const {
    site: {
      siteMetadata: { title, subtitle },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
        }
      }
    }
  `);
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={subtitle} />
      <meta
        name="google-site-verification"
        content="OKMYmcVuMfm9H_UjfNXPzRb2c0QoBtmZ7v1KwHNXnRQ"
      />
      <link rel="shortcut icon" type="image/png" href={icon} />
    </>
  );
}
