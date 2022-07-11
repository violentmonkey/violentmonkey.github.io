import React from 'react';
import { Link } from 'gatsby';

export default function PostItem(props) {
  const {
    data: {
      fields: { slug },
      frontmatter: { title, date },
    },
  } = props;
  return (
    <div className="mb-8">
      <h2>
        <Link className="text-gray-700" to={slug}>
          {title}
        </Link>
      </h2>
      <div>
        <time className="mr-2 text-sm text-gray-400 uppercase" dateTime={date}>
          {date}
        </time>
      </div>
    </div>
  );
}
