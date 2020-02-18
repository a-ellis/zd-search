import { zdSpacingXxs } from '@zendeskgarden/css-variables';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row } from '@zendeskgarden/react-tables';
import { Tag } from '@zendeskgarden/react-tags';
import React, { FunctionComponent } from 'react';
import { Organization } from '../interfaces/organization.interface';
import { OverflowMenu } from './OverflowMenu';

interface Props {
  organizations?: Organization[];
  onShowData: (data: Organization) => void;
}

export const OrganizationTableContent: FunctionComponent<Props> = ({ organizations, onShowData }: Props) => (
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
      {organizations?.map(organization => (
        <Row key={organization._id}>

          <Cell width="20%">{organization.name}</Cell>

          <Cell width="50%">
            {organization.domain_names?.map(name => (
              <Tag key={organization._id + name} style={{ marginRight: zdSpacingXxs }}>{name}</Tag>
            ))}
          </Cell>

          <Cell width="15%">{organization.details || <i><small>empty</small></i>}</Cell>

          <Cell width="15%" style={{ justifyContent: 'center' }}>
            {organization.shared_tickets ? (
                <Tag style={{ width: '20px', justifyContent: 'center' }} type="mint">Yes</Tag>
              ) : (
                <Tag style={{ width: '20px', justifyContent: 'center' }}>No</Tag>
              )
            }
          </Cell>

          <Cell menu>
            <OverflowMenu onSelect={() => onShowData(organization)}/>
          </Cell>

        </Row>
      ))}
    </Body>
  </div>
);
