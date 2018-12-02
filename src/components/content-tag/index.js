import React from 'react';
import Post from '../post-item';

export default function TagTemplateDetails(props) {
  const items = [];
  const {
    pageContext: { tag },
    data: {
      allMarkdownRemark: { edges },
    },
  } = props;
  edges.forEach(edge => {
    items.push(<Post data={edge} key={edge.node.fields.slug} />);
  });
  return (
    <div className="content">
      <div className="page">
        <h1 className="page-title">
          All Posts tagged as &quot;
          {tag}
          &quot;
        </h1>
        <div className="page-body">
          {items}
        </div>
      </div>
    </div>
  );
}
