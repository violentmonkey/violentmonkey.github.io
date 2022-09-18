import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PostItem from '@/components/post-item';
import Layout from '@/components/layout';

export { Head } from '@/components/head';

export default function PostsPage({ location }) {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx(
        limit: 100
        filter: { fields: { slug: { regex: "/^posts//" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            tags
          }
        }
      }
    }
  `);
  return (
    <Layout location={location}>
      <main className="max-w-screen-lg mx-auto">
        <section>
          {nodes.map((item, i) => (
            <PostItem key={i} data={item} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
