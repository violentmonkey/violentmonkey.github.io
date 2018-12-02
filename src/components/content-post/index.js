import React from 'react';
import { Link } from 'gatsby';
import { format } from 'date-fns/esm';
import Disqus from '../disqus';
import './style.css';

export default function PostTemplateDetails(props) {
  const {
    data: {
      site: { siteMetadata },
      markdownRemark: post,
    },
  } = props;
  const tags = post.fields.tagSlugs;

  const homeBlock = (
    <div>
      <Link className="post-home-button" to="/posts/">All Articles</Link>
    </div>
  );

  const tagsBlock = (
    <div className="post-tags">
      <ul className="post-tags-list">
        {tags && tags.map((tag, i) => (
          <li className="post-tags-list-item" key={tag}>
            <Link to={tag} className="post-tags-list-item-link">
              {post.frontmatter.tags[i]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const commentsBlock = (
    <div>
      <Disqus postNode={post} siteMetadata={siteMetadata} />
    </div>
  );

  return (
    <div className="post-wrap">
      {homeBlock}
      <div className="post">
        <h1 className="post-title">{post.frontmatter.title}</h1>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="post-date">
          <em>
            Published at
            {' '}
            {format(post.frontmatter.date, 'd MMM yyyy')}
          </em>
        </div>
        <div className="post-footer">
          {tagsBlock}
          {commentsBlock}
        </div>
      </div>
    </div>
  );
}
