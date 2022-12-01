import React from 'react';
import { AppShell } from '@mantine/core';
import { Navbar, Header } from '../../components';

const Home = () => {
  return (
    <AppShell padding="md" navbar={<Navbar />} header={<Header />}>
      {/* Your application here */}
    </AppShell>
  );
};

export default Home;
