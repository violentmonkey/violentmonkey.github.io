const path = require('path');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://violentmonkey.github.io/',
    title: 'Violentmonkey',
    subtitle: 'An open source userscript manager.',
    copyright: '© All rights reserved.',
    disqusShortname: '',
    menu: [
      {
        label: 'Get it',
        path: '/get-it/',
      },
      {
        label: 'API',
        path: '/api/',
      },
      {
        label: 'FAQ',
        path: '/faq/',
      },
      {
        label: 'Blog',
        path: '/posts/',
      },
    ],
    footer: [
      {
        label: 'Privacy Policy',
        path: '/privacy/',
      },
    ],
  },
  plugins: [
    ...['pages', 'posts'].map(type => ({
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/${type}`,
        name: type,
      },
    })),
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 70,
            },
          },
          'gatsby-remark-mermaid',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-93752732-1',
        exclude: ['/auth_**'],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(
                filter: {
                  path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) => allSitePage.edges.map(edge => {
          return {
            url: site.siteMetadata.siteUrl + edge.node.path,
            changefreq: 'daily',
            priority: 0.7,
          };
        }),
      },
    },
    'gatsby-plugin-manifest',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        parser: require('postcss-scss'),
        postCssPlugins: [
          // Transform @import, resolve `#` to `$PWD/src`
          require('postcss-import')({
            resolve(id) {
              if (id.startsWith('#/')) return path.resolve(`src/${id.slice(2)}`);
              return id;
            },
          }),
          // Transform SCSS into CSS
          require('precss'),
          // Transform colors
          require('postcss-color-function'),
          // Calculate at compile time
          require('postcss-calc'),
          // px to rem
          require('postcss-plugin-px2rem')({ rootValue: 16 }),
        ],
      },
    },
    // Put sharp after postcss so that its CSS will be kept
    'gatsby-plugin-sharp',
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect',
  ],
};
