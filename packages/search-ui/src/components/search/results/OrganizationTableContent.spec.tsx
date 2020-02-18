import React from 'react';
import { render, waitForElement, wait } from '../../../utils/test-utils';
import { Organization } from '../interfaces/organization.interface';
import { OrganizationTableContent } from './OrganizationTableContent';

const getDefaultProps = (props?: { onShowData: (data: Organization) => void }) => ({
  onShowData: jest.fn(),
  ...props
})

describe('OrganizationTableContent', () => {
  it('renders', () => {
    const { baseElement } = render(<OrganizationTableContent {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });

  it('renders expected columns for organizations', () => {
    const mockOrgs = [
      { _id: 1, name: 'Org 1' },
      { _id: 2, name: 'Org 2' }
    ] as unknown as Organization[];

    const { getByText } = render(<OrganizationTableContent {...getDefaultProps()} organizations={mockOrgs} />);

    expect(getByText('Name')).toBeVisible();
    expect(getByText('Details')).toBeVisible();
    expect(getByText('Domain Names')).toBeVisible();
    expect(getByText('Shared Tickets')).toBeVisible();
  });

  it('renders Tags for domain names', () => {
    const mockOrgs = [
      { _id: 1, name: 'Org 1', domain_names: ['test.com'] }
    ] as unknown as Organization[];

    const { getByText } = render(<OrganizationTableContent {...getDefaultProps()} organizations={mockOrgs} />);

    expect(getByText('test.com')).toBeVisible();
    expect(getByText('test.com').getAttribute('data-garden-id')).toContain('tag');
  });

  describe('Shared Tickets', () => {
    it('renders default tag for "false"', () => {
      const mockOrgs = [
        { _id: 1, name: 'Org 1', shared_tickets: false }
      ] as unknown as Organization[];

      const { getByText } = render(<OrganizationTableContent {...getDefaultProps()} organizations={mockOrgs} />);

      expect(getByText('No')).toBeVisible();
      expect(getByText('No').getAttribute('data-garden-id')).toContain('tag');
    });

    it('renders mint tag for "true"', () => {
      const mockOrgs = [
        { _id: 1, name: 'Org 1', shared_tickets: true }
      ] as unknown as Organization[];

      const { getByText } = render(<OrganizationTableContent {...getDefaultProps()} organizations={mockOrgs} />);

      expect(getByText('Yes')).toBeVisible();
      expect(getByText('Yes').getAttribute('data-garden-id')).toContain('tag');
      expect(getByText('Yes').getAttribute('class')).toContain('mint');
    });
  });

  it('renders a button for opening row options', async () => {
    const mockOrgs = [
      { _id: 1, name: 'Org 1', shared_tickets: true }
    ] as unknown as Organization[];
    const mockOnShowData = jest.fn();

    const { container, getByText } = render(<OrganizationTableContent {...getDefaultProps({ onShowData: mockOnShowData })} organizations={mockOrgs} />);

    container.querySelector<HTMLButtonElement>('[data-garden-id="tables.overflow_button"]')?.click();

    (await waitForElement(() => getByText('View Raw Data'))).click();

    expect(mockOnShowData).toHaveBeenCalled();
  });
});