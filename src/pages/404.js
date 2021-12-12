import React from 'react';
import Layout from '#/components/layout';
import { withProvider } from '#/common/sidebar';

export default withProvider(function NotFoundRoute({ location }) {
  return (
    <Layout location={location}>
      <main>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </main>
    </Layout>
  );
});
