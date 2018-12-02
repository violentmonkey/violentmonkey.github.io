import React from 'react';
import { Link } from 'gatsby';
import logo from '#/assets/vm.png';
import './style.css';

export default props => {
  const {
    data: {
      site: {
        siteMetadata: { title, subtitle },
      },
      markdownRemark: { html },
    },
  } = props;
  return (
    <div className="content">
      <div className="page index">
        <div className="index-header">
          <div className="index-logo">
            <img src={logo} />
          </div>
          <div className="index-title">{title}</div>
          <div className="index-subtitle">{subtitle}</div>
          <div className="index-buttons">
            <Link to="/get-it/">Get it!</Link>
            <Link to="/donate/">Donate</Link>
            <a href="https://github.com/violentmonkey/violentmonkey" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </div>
        <div className="page-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};
