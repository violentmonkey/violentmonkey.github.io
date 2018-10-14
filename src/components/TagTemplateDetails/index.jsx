import React from 'react';
import Post from '../Post';

class TagTemplateDetails extends React.Component {
  render() {
    const items = [];
    const {
      pathContext: { tag },
      data: {
        allMarkdownRemark: { edges },
      },
    } = this.props;
    edges.forEach(edge => {
      items.push(<Post data={edge} key={edge.node.fields.slug} />);
    });
    return (
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              All Posts tagged as &quot;
              {tag}
&quot;
            </h1>
            <div className="page__body">
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TagTemplateDetails;
