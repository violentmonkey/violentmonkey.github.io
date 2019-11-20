import React from 'react';
import { Link } from 'gatsby';
import { format, parseISO } from 'date-fns/esm';
import './style.css';

export default function Post(props) {
  const {
    data: {
      node: {
        frontmatter: {
          title, date,
        },
        fields: {
          slug,
        },
      },
    },
  } = props;
  const dateObj = parseISO(date);
  return (
    <div className="postitem">
      <div className="postitem-meta">
        {date && (
          <time className="postitem-meta-time" dateTime={format(dateObj, 'MMMM d, yyyy')}>
            {format(dateObj, 'MMMM yyyy')}
          </time>
        )}
      </div>
      <h2 className="postitem-title">
        <Link className="postitem-title-link" to={slug}>{title}</Link>
      </h2>
      <Link className="postitem-readmore" to={slug}>Read</Link>
    </div>
  );
}
