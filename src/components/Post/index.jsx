import React from 'react';
import { Link } from 'gatsby';
import { format } from 'date-fns/esm';
import './style.scss';

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
    return (
      <div className="post">
        <div className="post__meta">
          <time className="post__meta-time" dateTime={format(date, 'MMMM d, yyyy')}>
            {format(date, 'MMMM yyyy')}
          </time>
          <span className="post__meta-divider" />
          <span className="post__meta-category" key={categorySlug}>
            <Link to={categorySlug} className="post__meta-category-link">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>{title}</Link>
        </h2>
        <p className="post__description">{description}</p>
        <Link className="post__readmore" to={slug}>Read</Link>
      </div>
    );
  }
}

export default Post;
