exports.onCreateNode = async ({ node, getNode, actions }) => {
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);
    let slug = [
      parent.relativeDirectory,
      parent.name === 'index' ? '' : parent.name,
    ].filter(Boolean).join('/') + '/';
    if (!slug.startsWith('/')) slug = `/${slug}`;
    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
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
