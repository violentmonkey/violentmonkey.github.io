import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';

class TagsRoute extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: { title, menu, footer },
        },
        allMarkdownRemark: { group },
      },
    } = this.props;
    const siteMeta = {
      menu,
      footer,
      title: `All Tags - ${title}`,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Tags</h1>
              <div className="page__body">
                <div className="tags">
                  <ul className="tags__list">
                    {group.map(tag => (
                      <li key={tag.fieldValue} className="tags__list-item">
                        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className="tags__list-item-link">
                          {tag.fieldValue}
                          {' '}
(
                          {tag.totalCount}
)
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagsRoute;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        subtitle
        menu {
          label
          path
        }
        footer {
          label
          path
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
