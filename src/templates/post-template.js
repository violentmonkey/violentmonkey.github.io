import React, { useRef } from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { format, parseISO } from 'date-fns/esm';
import Layout from '#/components/layout';
import Disqus from '#/components/disqus';
import TOC from '#/components/toc';

export default function PostTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title,
        },
      },
      markdownRemark: post,
    },
  } = props;
  const {
    frontmatter: {
      title: postTitle,
      tags,
      date,
    },
    fields: {
      tagSlugs,
    },
    html,
    tableOfContents,
  } = post;
  const articleRef = useRef();

  const tagsBlock = tagSlugs && tagSlugs.length > 0 && (
    <ul className="post-tag">
      {tagSlugs.map((tag, i) => (
        <li className="post-tag-item" key={tag}>
          <Link to={tag}>
            {tags[i]}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Layout>
      <Helmet>
        <title>{`${postTitle} - ${title}`}</title>
      </Helmet>
      <main className="post">
        <h1>{postTitle}</h1>
        <TOC data={tableOfContents} articleRef={articleRef} />
        <article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
        <div className="post-date">
          <em>
            Published at
            {' '}
            {format(parseISO(date), 'd MMM yyyy')}
          </em>
        </div>
      </main>
      <footer>
        {tagsBlock}
        <Disqus postNode={post} />
      </footer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
      }
      tableOfContents
    }
  }
`;
