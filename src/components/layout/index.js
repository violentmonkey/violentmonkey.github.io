import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import icon from '#/assets/vm.png';
import '#/common/style.css';
import Header from '../header';
import Footer from '../footer';
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
  return (
    <>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <link rel="shortcut icon" type="image/png" href={icon} />
      </Helmet>
      {!hideHeader && <Header />}
      <div className={styles.body}>
        {children}
        <Footer />
      </div>
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
