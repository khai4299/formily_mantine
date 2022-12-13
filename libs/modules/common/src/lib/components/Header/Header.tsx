import React from 'react';
import { Avatar, Header as HeaderMantine, Menu, Tabs } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons';
import { logout } from '@formily-mantine/modules/auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate('/login');
  };
  const { tabValue } = useParams();
  const location = useLocation();
  const tabs = [
    {
      href: 'simple-form',
      label: 'Simple Form',
    },
    {
      href: 'general-form',
      label: 'General Form',
    },
    {
      href: 'management-form',
      label: 'Array Form',
    },
  ];
  return (
    <HeaderMantine
      className="flex left-[var(--mantine-navbar-width)]"
      height={66}
    >
      <Tabs
        defaultValue={location.pathname.split('/')[1]}
        onTabChange={(value) => navigate(`${value}`)}
      >
        <Tabs.List className="h-full">
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.href} value={tab.href}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div className="mr-4 h-full flex items-center justify-center ml-auto">
            <Avatar className="cursor-pointer " size="lg" radius="xl">
              <IconUser size={24} color="black" />
            </Avatar>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            className="text-base"
            icon={<IconLogout size={14} />}
            onClick={onLogout}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </HeaderMantine>
  );
};

export default Header;
