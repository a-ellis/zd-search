import { Body, Cell, Head, HeaderCell, HeaderRow, Row } from '@zendeskgarden/react-tables';
import React, { FunctionComponent } from 'react';
import { Ticket } from '../interfaces/ticket.interface';
import { OverflowMenu } from './OverflowMenu';
import { Tag } from '@zendeskgarden/react-tags';
import { zdColorSecondaryOrangeM400, zdColorSecondaryCrimsonM600, zdColorSecondaryTeal600, zdColorKale400 } from '@zendeskgarden/css-variables';
import { ReactComponent as AlertWarningIcon } from '@zendeskgarden/svg-icons/src/16/alert-warning-fill.svg';

interface Props {
  tickets?: Ticket[];
}

export const TicketTableContent: FunctionComponent<Props> = ({ tickets }: Props) => {
  const getPriorityType = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return zdColorSecondaryCrimsonM600;
      case 'high':
        return zdColorSecondaryOrangeM400;
      case 'normal':
        return zdColorSecondaryTeal600;
      case 'low':
        return zdColorKale400;
      default:
        return zdColorKale400;
    }
  };

  const getStatusType = (status: string) => {
    switch(status) {
      case 'solved':
        return 'mint';
      case 'hold':
        return 'grey';
      case 'pending':
        return 'lemon'
      case 'open':
        return 'blue';
      default:
        return null;
    }
  }

  return (
    <div data-testid="ticket-table-content">
        <Head>
          <HeaderRow>
            <HeaderCell width="40%">Subject</HeaderCell>
            <HeaderCell width="20%">Priority</HeaderCell>
            <HeaderCell width="20%">Type</HeaderCell>
            <HeaderCell width="20%">Status</HeaderCell>
          </HeaderRow>
        </Head>

        <Body>
          {tickets?.map(({_id, subject, priority, type, status }) => (
            <Row key={_id}>

              <Cell width="40%">{subject}</Cell>

              <Cell width="20%">
                {priority ? (
                  <span style={{ color: getPriorityType(priority), textTransform: 'capitalize' }}>
                    {priority === 'urgent' ? (
                      <>
                        {priority}
                        <AlertWarningIcon style={{ verticalAlign: 'text-bottom', marginLeft: '8px' }} />
                      </>
                    ) : (<>{priority}</>)
                    }
                  </span>
                ) : (<i><small>empty</small></i>)}
              </Cell>

              <Cell width="20%" style={{ textTransform: 'capitalize' }}>{type || <i><small>empty</small></i>}</Cell>

              <Cell width="20%">
                {status ? (
                  <Tag type={getStatusType(status)} style={{ width: '60px', textTransform: 'uppercase', justifyContent: 'center' }}>{status}</Tag>
                ) : (<i><small>empty</small></i>)}
              </Cell>

              <Cell menu>
                <OverflowMenu onSelect={(selection: any) => console.log(selection)}/>
              </Cell>

            </Row>
          ))}
        </Body>
      </div>
  );
};
