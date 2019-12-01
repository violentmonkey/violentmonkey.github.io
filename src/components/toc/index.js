import React, { useRef, useEffect } from 'react';
import onScroll from '#/common/scroller';
import styles from './style.module.css';

export default function TOC(props) {
  const { className, data } = props;
  if (!data) return null;
  const ref = useRef();
  useEffect(() => {
    const list = Array.from(ref.current.querySelectorAll('a'));
    list.forEach(a => {
      a.dataset.id = decodeURIComponent(a.href.split('#')[1] || '');
    });
    const listener = () => {
      const { articleRef } = props;
      if (!articleRef.current || !ref.current) return;
      const { scrollTop } = document.body;
      const headings = Array.from(articleRef.current.children, el => {
        return el.id && {
          id: el.id,
          offset: el.getBoundingClientRect().top - scrollTop - 70,
        };
      })
      .filter(Boolean);
      const { id } = headings.find((_, i) => {
        const next = headings[i + 1];
        return next && next.offset > 0;
      }) || {};
      list.forEach(el => {
        el.className = el.dataset.id === id ? 'active' : '';
      });
    };
    return onScroll(listener);
  });

  // Gatsby bug: https://github.com/gatsbyjs/gatsby/issues/8982
  const html = data.replace(/&#x3C;/gi, '<');
  return (
    <section className={`${styles.toc} ${className || ''}`}>
      <h2>Table of Contents</h2>
      <div ref={ref} className={styles.list} dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
