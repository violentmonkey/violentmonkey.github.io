const _ = require('lodash');
const path = require('path');
const slash = require('slash');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    node.frontmatter.description = node.frontmatter.description || '';
    let slug = node.frontmatter.path;
    const parentNode = getNode(node.parent);
    const type = parentNode.sourceInstanceName;
    if (!slug) {
      if (type === 'pages') {
        slug = createFilePath({ node, getNode, basePath: 'content/pages' });
      } else {
        slug = createFilePath({ node, getNode, basePath: 'content' });
      }
    }
    createNodeField({
      node,
      name: 'draft',
      value: !!node.frontmatter.draft,
    });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'type',
      value: type,
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postsTemplate = path.resolve('./src/templates/posts-template.js');
  const postTemplate = path.resolve('./src/templates/post-template.js');
  const pageTemplate = path.resolve('./src/templates/page-template.js');
  const tagTemplate = path.resolve('./src/templates/tag-template.js');
  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: {
          fields: { draft: { ne: true } }
        }
        sort: { fields: [frontmatter___date], order: DESC },
      ) {
        edges {
          node {
            fields {
              slug
              type
            }
            frontmatter {
              title
              date
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
    const { slug, type } = edge.node.fields;
    if (type === 'pages') {
      createPage({
        path: slug,
        component: slash(pageTemplate),
        context: {
          slug,
          type,
        },
      });
    } else if (type === 'posts') {
      createPage({
        path: slug,
        component: slash(postTemplate),
        context: {
          slug,
          type,
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
    }
  });
};
