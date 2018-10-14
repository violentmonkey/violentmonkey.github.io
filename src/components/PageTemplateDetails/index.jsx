import React from 'react';
import './style.scss';

class PageTemplateDetails extends React.Component {
  render() {
    const {
      data: { markdownRemark },
    } = this.props;
    return (
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">{markdownRemark.frontmatter.title}</h1>
            <div className="page__body autolink-fix" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageTemplateDetails;
