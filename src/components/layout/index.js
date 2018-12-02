import React from 'react';
import Helmet from 'react-helmet';
import icon from '#/assets/vm.png';
import Nav from '#/components/nav';
import Footer from '#/components/footer';
import '#/common/style.css';
import './style.css';

export default class Layout extends React.Component {
  async componentDidMount() {
    const WebFont = await import('webfontloader');
    WebFont.load({
      google: {
        families: ['Roboto:400,400i,500,700'],
      },
    });
  }

  render() {
    const {
      children,
      title,
      description,
      menu,
      footer,
      copyright,
    } = this.props;
    return (
      <div className="layout">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" type="image/png" href={icon} />
        </Helmet>
        {menu && <Nav data={menu} />}
        {children}
        {footer && <Footer footer={footer} copyright={copyright} />}
      </div>
    );
  }
}
