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
        label: 'Guide',
        path: '/guide/',
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
    ...['pages', 'posts', 'assets'].map(type => ({
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
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-external-links',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-93752732-1',
        anonymize: true,
        exclude: ['/auth_**'],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/vm.png',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /\/auth_\w+\.html/,
              handler: 'NetworkOnly',
            },
          ],
        },
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    // Put sharp after postcss so that its CSS will be kept
    'gatsby-plugin-sharp',
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-layout',
  ],
};
