import { Body, Cell, Head, HeaderCell, HeaderRow, Row } from '@zendeskgarden/react-tables';
import React, { FunctionComponent } from 'react';
import { User } from '../interfaces/user.interface';
import { OverflowMenu } from './OverflowMenu';
import { Tag } from '@zendeskgarden/react-tags';

interface Props {
  users?: User[];
  onShowData: (user: User) => void;
}

export const UserTableContent: FunctionComponent<Props> = ({ users, onShowData }: Props) => (
  <div data-testid="user-table-content">
    <Head>
      <HeaderRow>
        <HeaderCell width="30%">Name</HeaderCell>
        <HeaderCell width="20%">Phone</HeaderCell>
        <HeaderCell width="30%">Email</HeaderCell>
        <HeaderCell width="20%">Role</HeaderCell>
      </HeaderRow>
    </Head>

    <Body>
      {users?.map(user => (
        <Row key={user._id}>

          <Cell width="30%">{user.name}</Cell>

          <Cell width="20%">
            <Tag pill>{user.phone}</Tag>
          </Cell>

          <Cell width="30%" truncate>{user.email || <i><small>empty</small></i>}</Cell>

          <Cell width="20%">
            <Tag style={{ width: '60px', justifyContent: 'center', textTransform: 'capitalize' }}>
              {user.role === 'end-user' ? user.role.replace(/-/g, ' ') : user.role}
            </Tag>
          </Cell>

          <Cell menu>
            <OverflowMenu onSelect={() => onShowData(user)}/>
          </Cell>

        </Row>
      ))}
    </Body>
  </div>
);
