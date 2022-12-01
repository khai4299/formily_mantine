import React from 'react';
import { Navbar as NavbarMantine } from '@mantine/core';
import { Menu, Button, Text } from '@mantine/core';

const Navbar = () => {
  return (
    <NavbarMantine width={{ base: 300 }} height={'100%'}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Toggle menu</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </NavbarMantine>
  );
};

export default Navbar;
