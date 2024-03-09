import remarkGfm from 'remark-gfm';
import remarkExternalLinks from 'remark-external-links';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

export default {
  siteMetadata: {
    siteUrl: 'https://violentmonkey.github.io/',
    title: 'Violentmonkey',
    subtitle: 'An open source userscript manager.',
    copyright: '© All rights reserved.',
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
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'G-2E0X3LSCBM',
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          exclude: ['/auth_**'],
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/vm.png',
      },
    },
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 70,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              linkImagesToOriginal: false,
            },
          },
          '@gera2ld/gatsby-remark-emoji',
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkExternalLinks],
          rehypePlugins: [
            rehypeSlug,
            [rehypePrism, { ignoreMissing: true }],
          ],
        },
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // {
    //   resolve: 'gatsby-redirect-from',
    //   options: {
    //     query: 'allMdx',
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: './src',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './content',
      }
    },
  ],
};
