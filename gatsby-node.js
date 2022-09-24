const path = require('path');

exports.onCreateNode = async ({ node, getNode, actions }) => {
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);
    let slug =
      [parent.relativeDirectory, parent.name === 'index' ? '' : parent.name]
        .filter(Boolean)
        .join('/');
    if (slug && !slug.endsWith('/')) slug += '/';
    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  {
    const {
      data: {
        allMdx: { nodes },
      },
    } = await graphql(`
      query {
        allMdx {
          nodes {
            fields {
              slug
            }
            frontmatter {
              redirect_from
            }
          }
        }
      }
    `);
    nodes.forEach((node) => {
      const toPath = `/${node.fields.slug}`;
      node.frontmatter.redirect_from?.forEach((fromPath) => {
        actions.createRedirect({
          fromPath,
          toPath,
          isPermanent: true,
          redirectInBrowser: true,
        });
      });
    });
  }
  {
    const { data, errors } = await graphql(`
      query {
        allMdx(filter: { fields: { slug: { ne: null } } }) {
          nodes {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `);
    if (errors) throw errors;
    const templatePost = path.resolve('src/templates/post/index.js');
    data.allMdx.nodes.forEach((node) => {
      const slug = node.fields.slug;
      actions.createPage({
        path: `/${slug}`,
        component: `${templatePost}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
        },
      });
    });
  }
};
