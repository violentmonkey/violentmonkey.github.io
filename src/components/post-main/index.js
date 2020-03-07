import { format } from 'date-fns';
import React, { useRef } from 'react';
import TOC from '../toc';
import Disqus from '../disqus';
import TagBlock from '../tag-block';
import Sidebar from '../sidebar';
import styles from './style.module.css';

export default function PostMain(props) {
  const {
    data: {
      markdownRemark: post,
    },
  } = props;
  const {
    frontmatter: {
      title: postTitle,
      date,
      tags,
      sidebar,
    },
    fields: {
      tagSlugs,
      type,
    },
    html,
    tableOfContents,
  } = post;

  const commentsBlock = <Disqus postNode={post} />;
  const articleRef = useRef();
  return (
    <>
      <Sidebar active={sidebar} />
      <main className={`flex-1 ${styles.main}`}>
        <section className={styles.header}>
          <h1>{postTitle}</h1>
        </section>
        <section className={styles.body}>
          <TOC className={styles.toc} data={tableOfContents} articleRef={articleRef} />
          <article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
        </section>
        <section>
          <hr />
          {type === 'posts' && (
            <div className={styles.date}>
              <em>Published at {format(new Date(date), 'MMMM d, yyyy')}</em>
            </div>
          )}
          <TagBlock tags={tags} tagSlugs={tagSlugs} />
        </section>
        {commentsBlock}
      </main>
    </>
  );
}
