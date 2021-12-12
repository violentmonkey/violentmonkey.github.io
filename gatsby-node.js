const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions;
  const {
    data: {
      allMdx: {
        nodes,
      },
    },
  } = await graphql(`
    {
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
  nodes.forEach(node => {
    const toPath = node.fields.slug;
    node.frontmatter.redirect_from?.forEach(fromPath => {
      createRedirect({
        fromPath,
        toPath,
        isPermanent: true,
        redirectInBrowser: true
      });
    });
  });
};
