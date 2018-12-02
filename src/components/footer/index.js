import React from 'react';
import { Link } from 'gatsby';
import './style.css';

export default function Footer(props) {
  const { footer, copyright } = props;
  return (
    <footer className="footer clearfix">
      <div className="footer-copyright">
        Violentmonkey
        {' '}
        {copyright}
      </div>
      <div className="footer-list">
        {footer.map(item => (
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
