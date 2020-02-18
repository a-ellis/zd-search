import React from 'react';
import { render, wait, waitForElement, screen } from '../../../utils/test-utils';
import { SearchResults } from './SearchResults';
import { SearchResult } from '../interfaces/search.interface';

describe('SearchResults', () => {
  it('renders', () => {
    const { baseElement } = render(<SearchResults />);

    expect(baseElement).toBeVisible();
  });

  it('renders "no results" when search results are empty', () => {
    const mockEmptyResults: SearchResult = [];
    const { getByText } = render(<SearchResults results={mockEmptyResults} />);

    expect(getByText('No Results Found')).toBeVisible();
  });

  it('renders singular version of caption with single result', () => {
    const mockResults = [
      { _id: 1, name: 'Jane' },
    ];
    const mockResultType = 'users';
    const { getByText } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

    expect(getByText('Showing 1 user')).toBeVisible();
  });

  it('renders pluralized version of caption with multiple results', () => {
    const mockResults = [
      { _id: 1, name: 'Jane' },
      { _id: 2, name: 'John' },
    ];
    const mockResultType = 'users';
    const { getByText } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

    expect(getByText('Showing 2 users')).toBeVisible();
  });

  describe('result type', () => {
    it('renders UserTableContent when "users', () => {
      const mockResults = [
        { _id: 1, name: 'Jane' }
      ];
      const mockResultType = 'users';
      const { getByTestId } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

      expect(getByTestId('user-table-content')).toBeVisible();
    });

    it('renders OrganizationTableContent when "organizations', () => {
      const mockResults = [
        { _id: 1, name: 'Super Corp' }
      ];
      const mockResultType = 'organizations';
      const { getByTestId } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

      expect(getByTestId('organization-table-content')).toBeVisible();
    });

    it('renders TicketTableContent when "tickets', () => {
      const mockResults = [
        { _id: 1, subject: 'something bad!' }
      ];
      const mockResultType = 'tickets';
      const { getByTestId } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

      expect(getByTestId('ticket-table-content')).toBeVisible();
    });
  });

  describe('Modal', () => {
    it('renders when view raw data is selected', async () => {
      const mockResults = [
        { _id: 1, name: 'Super Corp' }
      ];
      const mockResultType = 'organizations';
      const { container, getByText } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

      container.querySelector<HTMLButtonElement>('[data-garden-id="tables.overflow_button"]')?.click();
      (await waitForElement(() => getByText('View Raw Data'))).click();

      await wait(() => {
        expect(getByText('Viewing Raw Data')).toBeVisible();
      });
    });

    it('renders close button', async () => {
      const mockResults = [
        { _id: 1, name: 'Joe' }
      ];
      const mockResultType = 'users';
      const { container, getByText, getByTestId, queryByText } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

      container.querySelector<HTMLButtonElement>('[data-garden-id="tables.overflow_button"]')?.click();
      (await waitForElement(() => getByText('View Raw Data'))).click();

      await wait(() => {
        expect(getByText('Viewing Raw Data')).toBeVisible()
      });

      (await waitForElement(() => getByTestId('modal-close-button'))).click();

      await wait(() => {
        expect(queryByText('Viewing Raw Data')).toBeNull();
      });
    });

    it('all entity table types can open modal', async () => {
      const mockResults = [
        { _id: 1, subject: 'Oooooh nooooo' }
      ];
      const mockResultType = 'tickets';
      const { container, getByText } = render(<SearchResults results={mockResults} resultType={mockResultType} />);

      container.querySelector<HTMLButtonElement>('[data-garden-id="tables.overflow_button"]')?.click();
      (await waitForElement(() => getByText('View Raw Data'))).click();

      await wait(() => {
        expect(getByText('Viewing Raw Data')).toBeVisible()
      });
    });
  });
});
