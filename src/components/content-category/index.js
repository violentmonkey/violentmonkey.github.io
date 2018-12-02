import React from 'react';
import Post from '../post-item';

export default function CategoryTemplateDetails(props) {
  const {
    pageContext: {
      category,
    },
    data: {
      allMarkdownRemark: {
        edges,
      },
    },
  } = props;
  const items = [];
  edges.forEach(edge => {
    items.push(<Post data={edge} key={edge.node.fields.slug} />);
  });

  return (
    <div className="content">
      <div className="page">
        <h1 className="page-title">{category}</h1>
        <div className="page-body">{items}</div>
      </div>
    </div>
  );
}
