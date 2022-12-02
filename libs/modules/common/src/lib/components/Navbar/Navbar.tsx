import React from 'react';
import { Navbar as NavbarMantine } from '@mantine/core';
import { Menu, Button, Text } from '@mantine/core';

const Navbar = () => {
  return (
    <NavbarMantine
      className="top-0"
      p={16}
      width={{ base: 300 }}
      height={'100%'}
    >
      <img src="/assets/logo.svg" alt="" />
    </NavbarMantine>
  );
};

export default Navbar;
