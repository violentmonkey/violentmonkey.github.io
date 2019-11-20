import React, { useRef } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '#/components/layout';
import TOC from '#/components/toc';
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
        },
        tableOfContents,
      },
    },
  } = props;
  const articleRef = useRef();
  return (
    <Layout>
      <Helmet>
        <title>{`${pageTitle} - ${title}`}</title>
      </Helmet>
      <main className="post">
        <h1>{pageTitle}</h1>
        <TOC data={tableOfContents} articleRef={articleRef} />
        <article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
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
      }
      tableOfContents
    }
  }
`;
