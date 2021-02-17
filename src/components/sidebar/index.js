import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { SidebarContainer } from '#/common/sidebar';

export default function Sidebar() {
  const { items, setShow } = SidebarContainer.useContainer();
  useEffect(() => {
    if (items) {
      const onClick = () => {
        setShow(false);
      };
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, [items, setShow]);
  if (!items) return null;
  return (
    <aside className="sidebar">
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Link
              to={item.node.fields.slug}
              activeClassName="active"
            >
              {item.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
