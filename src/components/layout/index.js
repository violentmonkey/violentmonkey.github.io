import React from 'react';
import Helmet from 'react-helmet';
import icon from '#/assets/vm.png';
import '#/common/style.css';
import Header from '../header';
import Footer from '../footer';
import './style.css';

export default function Layout(props) {
  const {
    children,
    title,
    description,
  } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="shortcut icon" type="image/png" href={icon} />
      </Helmet>
      <Header />
      <div className="content">
        {children}
        <Footer />
      </div>
    </>
  );
}
