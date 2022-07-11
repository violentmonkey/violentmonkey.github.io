import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import TOC from '@/components/toc';
import { SidebarContainer, withProvider } from '@/common/sidebar';
import Layout from '@/components/layout';

export default withProvider(function PostPage({ location, data }) {
  const {
    mdx: post,
  } = data;
  const articleRef = useRef();
  const { setData } = SidebarContainer.useContainer();
  useEffect(() => {
    setData(post.frontmatter.sidebar);
    return () => {
      setData(null);
    };
  }, [post.frontmatter.sidebar, setData]);
  const { pathname } = location;
  const isHome = pathname === '/';
  return (
    <Layout location={location}>
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
            <MDXRenderer>
              {post.body}
            </MDXRenderer>
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
});

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
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
      body
      tableOfContents(maxDepth: 3)
    }
  }
`;
