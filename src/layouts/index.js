import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import icon from '#/assets/vm.png';
import '#/common/style.css';
import { SidebarContainer } from '#/common/sidebar';
import Header from '#/components/header';
import Footer from '#/components/footer';
import Sidebar from '#/components/sidebar';

function Layout(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title,
          subtitle,
        },
      },
      allMarkdownRemark: {
        edges,
      },
    },
    hideHeader,
    children,
  } = props;
  const { show, setEdges } = SidebarContainer.useContainer();
  useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);
  return (
    <>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <meta name="google-site-verification" content="OKMYmcVuMfm9H_UjfNXPzRb2c0QoBtmZ7v1KwHNXnRQ" />
        <link rel="shortcut icon" type="image/png" href={icon} />
      </Helmet>
      {!hideHeader && <Header />}
      <div className={`relative flex z-0 ${show ? 'sidebar-open' : ''}`}>
        <Sidebar />
        {children || <div className="h-64" />}
      </div>
      <Footer />
    </>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                sidebar {
                  match
                  order
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <SidebarContainer.Provider>
        <Layout {...props} data={data} />
      </SidebarContainer.Provider>
    )}
  />
);
