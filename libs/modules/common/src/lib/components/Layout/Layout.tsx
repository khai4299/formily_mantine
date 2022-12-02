import React from 'react';
import { AppShell } from '@mantine/core';
import { Navbar, Header } from '../index';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <AppShell padding="md" navbar={<Navbar />} header={<Header />}>
      <Outlet />
    </AppShell>
  );
};

export default Layout;
