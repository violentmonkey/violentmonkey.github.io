import React from 'react';

import PostItem from '#/components/post-item';

import styles from './style.module.css';

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
    <main className={styles.main}>
      <section className={styles.header}>
        <h1>{title}</h1>
        {!!description && <div className={styles.desc}>{description}</div>}
      </section>
      <section>
        {edges.map((item, i) => (
          <PostItem key={i} data={item} />
        ))}
      </section>
    </main>
  );
}
