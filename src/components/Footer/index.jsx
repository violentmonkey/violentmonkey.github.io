import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

export default function Footer(props) {
  const { data } = props;
  return (
    <footer className="footer clearfix">
      <div className="footer-copyright">
        Violentmonkey &copy; All rights reserved.
      </div>
      <div className="footer-list">
        {data.map(item => (
          <Link
            className="footer-list-item"
            key={item.path}
            to={item.path}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
