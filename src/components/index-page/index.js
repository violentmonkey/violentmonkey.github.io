import React from 'react';
import PostItem from '#/components/post-item';

export default function IndexPage(props) {
  const {
    pageContext: {
      title,
      description,
    },
    data: {
      allMarkdownRemark: {
        edges,
      },
    },
  } = props;
  return (
    <main className="max-w-screen-lg mx-auto">
      <section className="mb-10">
        <h1>{title}</h1>
        {!!description && <div className="mb-8 text-gray-600">{description}</div>}
      </section>
      <section>
        {edges.map((item, i) => (
          <PostItem key={i} data={item} />
        ))}
      </section>
    </main>
  );
}
