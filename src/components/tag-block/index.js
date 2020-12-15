import { Link } from 'gatsby';
import React from 'react';

export default function TagBlock(props) {
  const { tags, tagSlugs } = props;
  if (!tagSlugs?.length) return null;
  return (
    <ul>
      {tagSlugs.map((tag, i) => (
        <li className="inline-block mr-2 text-sm" key={tag}>
          <Link className="block px-3 py-1 bg-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-600" to={tag}>
            {tags[i]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
