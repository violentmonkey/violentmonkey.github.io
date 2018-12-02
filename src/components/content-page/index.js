import React from 'react';

export default function PageTemplateDetails(props) {
  const {
    data: { markdownRemark },
  } = props;
  return (
    <div className="content">
      <div className="page">
        <h1 className="page-title">{markdownRemark.frontmatter.title}</h1>
        <div className="page-body" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </div>
    </div>
  );
}
