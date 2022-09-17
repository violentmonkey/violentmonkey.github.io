import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import TOC from '@/components/toc';
import Layout from '@/components/layout';

export { Head } from '@/components/head';

export default function PostPage({ location, data, children }) {
  const { mdx: post } = data;
  const articleRef = useRef();
  const { pathname } = location;
  const isHome = pathname === '/';
  return (
    <Layout location={location} sidebar={post.frontmatter.sidebar}>
      <main className="flex-1 has-toc">
        {!isHome && (
          <section className="mb-10 pt-1">
            <h1>{post.frontmatter.title}</h1>
          </section>
        )}
        <section className="items-start with-toc">
          {!isHome && (
            <TOC data={post.tableOfContents} articleRef={articleRef} />
          )}
          <article className="flex-1 min-w-0 mr-4" ref={articleRef}>
            {children}
          </article>
        </section>
        <section>
          <hr />
          {post.fields.slug.startsWith('posts/') && (
            <div className="mb-6">
              <em>Published at {post.frontmatter.date}</em>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        sidebar {
          match
          order
        }
      }
      tableOfContents(maxDepth: 3)
    }
  }
`;
