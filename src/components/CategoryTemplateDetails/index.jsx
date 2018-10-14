import React from 'react';
import Post from '../Post';

class CategoryTemplateDetails extends React.Component {
  render() {
    const {
      pathContext: {
        category,
      },
      data: {
        allMarkdownRemark: {
          edges,
        },
      },
    } = this.props;
    const items = [];
    edges.forEach(edge => {
      items.push(<Post data={edge} key={edge.node.fields.slug} />);
    });

    return (
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              {category}
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

export default CategoryTemplateDetails;
