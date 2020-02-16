import { Nav, NavItem, NavItemIcon, NavItemText } from '@zendeskgarden/react-chrome';
import { ReactComponent as HomeIcon } from '@zendeskgarden/svg-icons/src/26/home-fill.svg';
import { ReactComponent as ZendeskIcon } from '@zendeskgarden/svg-icons/src/26/zendesk.svg';
import React, { FunctionComponent } from 'react';

export const Navigation: FunctionComponent = () => (
  <Nav>

    <NavItem current>
      <NavItemIcon>
        <HomeIcon />
      </NavItemIcon>
      <NavItemText>Home</NavItemText>
    </NavItem>

    <NavItem brandmark title="Zendesk">
      <NavItemIcon>
        <ZendeskIcon />
      </NavItemIcon>
      <NavItemText>&copy;Zendesk</NavItemText>
    </NavItem>

  </Nav>
);
