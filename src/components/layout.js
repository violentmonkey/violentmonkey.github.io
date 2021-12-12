import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import icon from '#/assets/vm.png';
import '#/common/style.css';
import { SidebarContainer } from '#/common/sidebar';
import Header from '#/components/header';
import Footer from '#/components/footer';
import Sidebar from '#/components/sidebar';

export default function Layout(props) {
  const {
    site: {
      siteMetadata: {
        title,
        subtitle,
      },
    },
    allMdx: {
      nodes,
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
        }
      }
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            sidebar {
              match
              order
            }
          }
        }
      }
    }
  `);
  const {
    location: {
      pathname,
    },
    children,
  } = props;
  const { show, setNodes } = SidebarContainer.useContainer();
  useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);
  if (pathname === '/offline-plugin-app-shell-fallback/') return null;
  return (
    <>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <meta name="google-site-verification" content="OKMYmcVuMfm9H_UjfNXPzRb2c0QoBtmZ7v1KwHNXnRQ" />
        <link rel="shortcut icon" type="image/png" href={icon} />
      </Helmet>
      <Header />
      <div className={`relative flex z-0 ${show ? 'sidebar-open' : ''}`}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}
