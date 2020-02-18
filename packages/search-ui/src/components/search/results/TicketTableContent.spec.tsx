import React from 'react';
import { TicketTableContent } from './TicketTableContent';
import { render } from '../../../utils/test-utils';
import { Ticket } from '../interfaces/ticket.interface';

const getDefaultProps = (props?: { onShowData: (data: Ticket) => void }) => ({
  onShowData: jest.fn(),
  ...props
})

describe('TicketTableContent', () => {
  it('renders', () => {
    const { baseElement } = render(<TicketTableContent {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });

  it('renders expected columns for tickets', () => {
    const mockOrgs = [
      { _id: 1, subject: 'Ticket 1', priority: 'urgent', status: 'solved' },
      { _id: 2, subject: 'Ticket 2', priority: 'high', status: 'hold' },
      { _id: 3, subject: 'Ticket 3', priority: 'normal', status: 'open' },
      { _id: 4, subject: 'Ticket 4', priority: 'low', status: 'pending' },
      { _id: 5, subject: 'Ticket 5', priority: 'something-else', status: 'error' },
    ] as unknown as Ticket[];

    const { getByText } = render(<TicketTableContent {...getDefaultProps()} tickets={mockOrgs} />);

    expect(getByText('Subject')).toBeVisible();
    expect(getByText('Priority')).toBeVisible();
    expect(getByText('Type')).toBeVisible();
    expect(getByText('Status')).toBeVisible();
  });
});