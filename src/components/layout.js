import React from 'react';
import '@unocss/reset/tailwind.css';
import '@/common/style.css';
import { SidebarContainer } from '@/common/sidebar';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import DiscordButton from './discord';

function Layout(props) {
  const {
    location: { pathname },
    children,
  } = props;
  const { show } = SidebarContainer.useContainer();
  if (pathname === '/offline-plugin-app-shell-fallback/') return null;
  return (
    <>
      <Header />
      <div className={`relative flex z-0 ${show ? 'sidebar-open' : ''}`}>
        <Sidebar />
        {children}
      </div>
      <Footer />
      <DiscordButton />
    </>
  );
}

export default ({ sidebar, ...rest }) => (
  <SidebarContainer.Provider initialState={sidebar}>
    <Layout {...rest} />
  </SidebarContainer.Provider>
);
