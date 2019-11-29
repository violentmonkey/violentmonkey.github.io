import { Link } from 'gatsby';
import React from 'react';
import styles from './style.module.css';

export default function TagBlock(props) {
  const { tags, tagSlugs } = props;
  if (!tagSlugs?.length) return null;
  return (
    <ul className={styles.list}>
      {tagSlugs.map((tag, i) => (
        <li className={styles.item} key={tag}>
          <Link to={tag}>
            {tags[i]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
