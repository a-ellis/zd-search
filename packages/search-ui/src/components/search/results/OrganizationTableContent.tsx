import { zdSpacingXxs } from '@zendeskgarden/css-variables';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row } from '@zendeskgarden/react-tables';
import { Tag } from '@zendeskgarden/react-tags';
import React, { FunctionComponent } from 'react';
import { Organization } from '../interfaces/organization.interface';
import { OverflowMenu } from './OverflowMenu';

interface Props {
  organizations?: Organization[];
}

export const OrganizationTableContent: FunctionComponent<Props> = ({ organizations }: Props) => (
  <div data-testid="organization-table-content">
    <Head>
      <HeaderRow>
        <HeaderCell width="20%">Name</HeaderCell>
        <HeaderCell width="50%">Domain Names</HeaderCell>
        <HeaderCell width="15%">Details</HeaderCell>
        <HeaderCell width="15%">Shared Tickets</HeaderCell>
      </HeaderRow>
    </Head>

    <Body>
      {organizations?.map(({_id, name, details, domain_names, shared_tickets }) => (
        <Row key={_id}>

          <Cell width="20%">{name}</Cell>

          <Cell width="50%">
            {domain_names?.map(name => (
              <Tag key={_id + name} style={{ marginRight: zdSpacingXxs }}>{name}</Tag>
            ))}
          </Cell>

          <Cell width="15%">{details || <i><small>empty</small></i>}</Cell>

          <Cell width="15%" style={{ justifyContent: 'center' }}>
            { shared_tickets ? (
                <Tag style={{ width: '20px', justifyContent: 'center' }} type="mint">Yes</Tag>
              ) : (
                <Tag style={{ width: '20px', justifyContent: 'center' }}>No</Tag>
              )
            }
          </Cell>

          <Cell menu>
            <OverflowMenu onSelect={(selection: any) => console.log(selection)}/>
          </Cell>

        </Row>
      ))}
    </Body>
  </div>
);
