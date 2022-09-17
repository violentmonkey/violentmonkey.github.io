import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import onScroll from '@/common/scroller';

function TOCList({ items }) {
  return (
    <ul>
      {items.map((item, i) => {
        const j = item.url.indexOf('#');
        const url = j < 0 ? '#' : item.url.slice(j);
        return (
          <li key={i}>
            <Link to={url}>{item.title}</Link>
            {item.items && <TOCList items={item.items} />}
          </li>
        );
      })}
    </ul>
  );
}

export default function TOC(props) {
  const { className, data, articleRef } = props;
  const ref = useRef();
  const refActive = useRef();
  useEffect(() => {
    if (!data) return;
    const list = Array.from(ref.current.querySelectorAll('a'));
    list.forEach((a) => {
      const id = decodeURIComponent(a.href.split('#')[1] || '');
      a.dataset.id = id;
      // `tableOfContents` from MDX does not support inline markups,
      // as a result the text content may be truncated.
      if (articleRef.current) {
        const h = articleRef.current.querySelector(`#${id}`);
        if (h) a.textContent = h.textContent.trim();
      }
    });
    const listener = () => {
      if (!articleRef.current || !ref.current) return;
      const { scrollTop } = document.body;
      const headings = list
        .map((a) => {
          const { id } = a.dataset;
          const el = articleRef.current.querySelector(`#${id}`);
          return (
            el && {
              id,
              a,
              offset: el.getBoundingClientRect().top - scrollTop - 70,
            }
          );
        })
        .filter(Boolean);
      const { a } =
        headings.find((_, i) => {
          const next = headings[i + 1];
          return next && next.offset > 0;
        }) || {};
      if (refActive.current) refActive.current.className = '';
      if (a) a.className = 'active';
      refActive.current = a;
    };
    return onScroll(listener);
  });

  return (
    <section className={`toc ${className || ''}`} ref={ref}>
      {data && (
        <>
          <h2>Table of Contents</h2>
          <TOCList items={data.items} />
        </>
      )}
    </section>
  );
}
