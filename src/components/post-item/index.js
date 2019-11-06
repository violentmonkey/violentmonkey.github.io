import React from 'react';
import { Link } from 'gatsby';
import { format, parseISO } from 'date-fns/esm';
import './style.css';

class Post extends React.Component {
  render() {
    const {
      data: {
        node: {
          frontmatter: {
            title, date, category, description,
          },
          fields: {
            slug, categorySlug,
          },
        },
      },
    } = this.props;
    const dateObj = parseISO(date);
    return (
      <div className="postitem">
        <div className="postitem-meta">
          {date && (
            <time className="postitem-meta-time" dateTime={format(dateObj, 'MMMM d, yyyy')}>
              {format(dateObj, 'MMMM yyyy')}
            </time>
          )}
          <span className="postitem-meta-category" key={categorySlug}>
            <Link to={categorySlug} className="postitem-meta-category-link">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="postitem-title">
          <Link className="postitem-title-link" to={slug}>{title}</Link>
        </h2>
        <p className="postitem-description">{description}</p>
        <Link className="postitem-readmore" to={slug}>Read</Link>
      </div>
    );
  }
}

export default Post;
