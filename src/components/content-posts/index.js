import React from 'react';
import { Link } from 'gatsby';
import Post from '../post-item';
import './style.css';

export default props => {
  const {
    pageContext: { group, index, pageCount },
  } = props;
  const items = group.map(edge => <Post data={edge} key={edge.node.fields.slug} />);
  let last;
  let next;
  if (index > 1) {
    last = <Link to={index > 2 ? `/${index - 1}/` : '/'}>&laquo; Newer</Link>;
  }
  if (index < pageCount) {
    next = <Link to={`/${index + 1}/`}>Older &raquo;</Link>;
  }
  return (
    <div className="content">
      {items}
      {(last || next) && (
        <div className="paginator">
          {last || <span />}
          {next || <span />}
        </div>
      )}
    </div>
  );
};
