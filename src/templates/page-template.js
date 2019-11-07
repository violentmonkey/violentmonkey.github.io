import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '#/components/layout';
import './page-template.css';

export default function PageTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title,
        },
      },
      markdownRemark: {
        html,
        frontmatter: {
          title: pageTitle,
          description,
        },
      },
    },
  } = props;
  return (
    <Layout>
      <Helmet>
        <title>{`${pageTitle} - ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <main className="post">
        <h1>{pageTitle}</h1>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
