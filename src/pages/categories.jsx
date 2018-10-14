import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';

class CategoriesRoute extends React.Component {
  render() {
    const {
      data: {
        site: {
          siteMetadata: {
            title, menu, footer,
          },
        },
        allMarkdownRemark: { group },
      },
    } = this.props;
    const siteMeta = {
      menu,
      footer,
      title: `All Categories - ${title}`,
    };
    return (
      <Layout siteMeta={siteMeta}>
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Categories</h1>
              <div className="page__body">
                <div className="categories">
                  <ul className="categories__list">
                    {group.map(category => (
                      <li key={category.fieldValue} className="categories__list-item">
                        <Link to={`/categories/${kebabCase(category.fieldValue)}/`} className="categories__list-item-link">
                          {category.fieldValue}
                          {' '}
(
                          {category.totalCount}
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

export default CategoriesRoute;

export const pageQuery = graphql`
  query CategoryesQuery {
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
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
