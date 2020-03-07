import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import icon from '#/assets/vm.png';
import '#/common/style.css';
import Header from '#/components/header';
import Footer from '#/components/footer';
import styles from './style.module.css';

function Layout(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          title,
          subtitle,
        },
      },
    },
    hideHeader,
    children,
  } = props;
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    if (sidebar) {
      const onClick = () => {
        setSidebar(false);
      };
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, [sidebar, setSidebar]);
  const handleToggle = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <meta name="google-site-verification" content="OKMYmcVuMfm9H_UjfNXPzRb2c0QoBtmZ7v1KwHNXnRQ" />
        <link rel="shortcut icon" type="image/png" href={icon} />
      </Helmet>
      {!hideHeader && <Header onToggle={handleToggle} />}
      <div className={`d-flex ${styles.body} ${sidebar ? 'sidebar-open' : ''}`}>
        {children}
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
      }
    `}
    render={data => <Layout {...props} data={data} />}
  />
);
