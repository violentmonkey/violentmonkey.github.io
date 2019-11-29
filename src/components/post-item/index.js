import React from 'react';
import { Link } from 'gatsby';
import { format } from 'date-fns';
import styles from './style.module.css';

export default function PostItem(props) {
  const {
    data: {
      node: {
        frontmatter: {
          title, date: dateStr,
        },
        fields: {
          slug,
        },
      },
    },
  } = props;
  const date = new Date(dateStr);
  return (
    <div className={styles.post}>
      <h2>
        <Link to={slug}>{title}</Link>
      </h2>
      <div className={styles.meta}>
        <time dateTime={format(date, 'MMMM d, yyyy')}>
          {format(date, 'MMMM d, yyyy')}
        </time>
      </div>
    </div>
  );
}
