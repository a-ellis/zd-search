import React from 'react';
import { SearchForm } from './SearchForm';
import { render } from '../../../utils/test-utils';

const getDefaultProps = () => ({
  onSearchEvent: jest.fn()
});

describe('Search', () => {
  it('renders with default props', () => {
    const { baseElement } = render(<SearchForm {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });
});
