const path = require('path');
const scssParser = require('postcss-scss');
const px2rem = require('postcss-plugin-px2rem');
const atImport = require('postcss-import');
const precss = require('precss');
const color = require('postcss-color-function');
const calc = require('postcss-calc');

module.exports = {
  siteMetadata: {
    url: 'https://violentmonkey.github.io/',
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
    author: {
      name: 'Gerald L.',
      email: 'i@gerald.top',
      telegram: 'gera2ld',
      twitter: 'gera2ld',
      github: 'gera2ld',
      rss: '',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     maxWidth: 960
          //   }
          // },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-copy-linked-files',
            // set ignoreFileExtensions to empty since `gatsby-remark-image` is disabled
            options: {
              ignoreFileExtensions: [],
            },
          },
        ],
      },
    },
    // 'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-93752732-1' },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  url
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
            url: site.siteMetadata.url + edge.node.path,
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
        parser: scssParser,
        postCssPlugins: [
          // Transform @import, resolve `#` to `$PWD/src`
          atImport({
            resolve(id) {
              if (id.startsWith('#/')) return path.resolve(`src/${id.slice(2)}`);
              return id;
            },
          }),
          // Transform SCSS into CSS
          precss,
          // Transform colors
          color,
          // Calculate at compile time
          calc,
          // px to rem
          px2rem({ rootValue: 16 }),
        ],
      },
    },
  ],
};
