import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { SidebarContainer } from '@/common/sidebar';

export default function Sidebar() {
  const { matchedNodes, setShow } = SidebarContainer.useContainer();
  useEffect(() => {
    if (matchedNodes) {
      const onClick = () => {
        setShow(false);
      };
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, [matchedNodes, setShow]);
  if (!matchedNodes) return null;
  return (
    <aside className="sidebar">
      <ul>
        {matchedNodes.map((node, i) => (
          <li key={i}>
            <Link
              to={node.fields.slug}
              activeClassName="active"
            >
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
