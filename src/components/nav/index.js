import React from 'react';
import { Link } from 'gatsby';
import logo from '#/assets/vm.png';
import './style.css';

export default function Nav(props) {
  const { data } = props;
  return (
    <nav className="menu clearfix">
      <Link to="/" className="menu-logo">
        <img src={logo} />
      </Link>
      <ul className="menu-list">
        {data.map(item => (
          <li className="menu-list-item" key={item.path}>
            <Link
              to={item.path}
              className="menu-list-item-link"
              activeClassName="menu-list-item-link active"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
