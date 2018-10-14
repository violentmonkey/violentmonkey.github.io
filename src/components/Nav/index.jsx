import React from 'react';
import { Link } from 'gatsby';
import logo from '../../assets/vm.png';
import './style.scss';

class Nav extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <nav className="menu clearfix">
        <Link to="/" className="menu__logo">
          <img src={logo} />
        </Link>
        <ul className="menu__list">
          {data.map(item => (
            <li className="menu__list-item" key={item.path}>
              <Link
                to={item.path}
                className="menu__list-item-link"
                activeClassName="menu__list-item-link menu__list-item-link--active"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Nav;
