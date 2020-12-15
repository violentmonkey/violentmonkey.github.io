import React from 'react';
import { Link } from 'gatsby';
import { format } from 'date-fns';

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
    <div className="mb-8">
      <h2>
        <Link className="text-gray-700" to={slug}>{title}</Link>
      </h2>
      <div>
        <time className="mr-2 text-sm text-gray-400 uppercase" dateTime={format(date, 'MMMM d, yyyy')}>
          {format(date, 'MMMM d, yyyy')}
        </time>
      </div>
    </div>
  );
}
