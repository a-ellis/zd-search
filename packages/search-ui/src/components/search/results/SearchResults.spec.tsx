import React from 'react';
import { render } from '../../../utils/test-utils';
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

    expect(getByText('No Results')).toBeVisible();
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
});
