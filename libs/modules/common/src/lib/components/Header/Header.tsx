import React from 'react';
import { Button, Menu, Text } from '@mantine/core';
import { Header as HeaderMantine } from '@mantine/core';

const Header = () => {
  return (
    <HeaderMantine height={56}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button className="block ml-auto">Toggle menu</Button>
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
    </HeaderMantine>
  );
};

export default Header;
