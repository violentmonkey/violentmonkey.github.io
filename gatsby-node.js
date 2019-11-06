const _ = require('lodash');
const path = require('path');
const slash = require('slash');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const name = path.basename(parsedFilePath.dir).match(/^(?:(.*?)--)?(.*)$/)[2];
    const slug = `/${name}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (
    node.internal.type === 'MarkdownRemark'
    && typeof node.slug === 'undefined'
  ) {
    node.frontmatter.description = node.frontmatter.description || '';
    node.frontmatter.draft = !!node.frontmatter.draft;
    let slug = node.frontmatter.path;
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === 'page') {
      node.frontmatter.type = node.frontmatter.type || 'page';
      if (!slug) slug = createFilePath({ node, getNode, basePath: 'content/pages' });
    } else {
      node.frontmatter.type = node.frontmatter.type || 'post';
      if (!slug) slug = createFilePath({ node, getNode, basePath: 'content' });
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postsTemplate = path.resolve('./src/templates/posts-template.js');
  const postTemplate = path.resolve('./src/templates/post-template.js');
  const pageTemplate = path.resolve('./src/templates/page-template.js');
  const tagTemplate = path.resolve('./src/templates/tag-template.js');
  const categoryTemplate = path.resolve('./src/templates/category-template.js');
  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { draft: { ne: true } } },
        sort: { fields: [frontmatter___date], order: DESC },
      ) {
        edges {
          node {
            fields {
              slug
              categorySlug
            }
            frontmatter {
              title
              date
              category
              description
              tags
              type
            }
          }
        }
      }
    }
  `);
  if (result.errors) throw result.errors;
  createPage({
    path: '/posts/',
    component: slash(postsTemplate),
  });
  result.data.allMarkdownRemark.edges.forEach(edge => {
    if (_.get(edge, 'node.frontmatter.type') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(pageTemplate),
        context: {
          slug: edge.node.fields.slug,
        },
      });
    } else if (_.get(edge, 'node.frontmatter.type') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(postTemplate),
        context: {
          slug: edge.node.fields.slug,
          type: 'post',
        },
      });

      let tags = new Set();
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = new Set([...tags, ...edge.node.frontmatter.tags]);
      }
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`;
        createPage({
          path: tagPath,
          component: tagTemplate,
          context: { tag },
        });
      });

      let categories = new Set();
      if (_.get(edge, 'node.frontmatter.category')) {
        categories = new Set([...categories, edge.node.frontmatter.category]);
      }
      categories.forEach(category => {
        const categoryPath = `/categories/${_.kebabCase(category)}/`;
        createPage({
          path: categoryPath,
          component: categoryTemplate,
          context: { category },
        });
      });
    }
  });
};
