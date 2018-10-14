import React from 'react';
import 'font-awesome/css/font-awesome.css';
import './style.scss';

class Links extends React.Component {
  render() {
    const {
      data: {
        telegram,
        twitter,
        github,
        rss,
        email,
      },
    } = this.props;
    return (
      <div className="links">
        <ul className="links__list">
          {twitter && (
            <li className="links__list-item">
              <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter" />
              </a>
            </li>
          )}
          {github && (
            <li className="links__list-item">
              <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-github" />
              </a>
            </li>
          )}
          {email && (
            <li className="links__list-item">
              <a href={`mailto:${email}`}>
                <i className="fa fa-envelope" />
              </a>
            </li>
          )}
          {telegram && (
            <li className="links__list-item">
              <a href={`telegram:${telegram}`}>
                <i className="fa fa-paper-plane" />
              </a>
            </li>
          )}
          {rss && (
            <li className="links__list-item">
              <a href={rss}>
                <i className="fa fa-rss" />
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Links;
