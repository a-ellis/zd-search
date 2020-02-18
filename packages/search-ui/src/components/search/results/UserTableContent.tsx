import { Body, Cell, Head, HeaderCell, HeaderRow, Row } from '@zendeskgarden/react-tables';
import React, { FunctionComponent } from 'react';
import { User } from '../interfaces/user.interface';
import { OverflowMenu } from './OverflowMenu';
import { Tag } from '@zendeskgarden/react-tags';

interface Props {
  users?: User[];
}

export const UserTableContent: FunctionComponent<Props> = ({ users }: Props) => (
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
      {users?.map(({_id, email, name, phone, role}) => (
        <Row key={_id}>

          <Cell width="30%">{name}</Cell>

          <Cell width="20%">
            <Tag pill>{phone}</Tag>
          </Cell>

          <Cell width="30%" truncate>{email || <i><small>empty</small></i>}</Cell>

          <Cell width="20%">
            <Tag style={{ width: '60px', justifyContent: 'center', textTransform: 'capitalize' }}>
              {role === 'end-user' ? role.replace(/-/g, ' ') : role}
            </Tag>
          </Cell>

          <Cell menu>
            <OverflowMenu onSelect={(selection: any) => console.log(selection)}/>
          </Cell>

        </Row>
      ))}
    </Body>
  </div>
);
