import React from 'react';
import { Search } from './Search';
import { render } from '@testing-library/react';

describe('Search', () => {
  it('should render', () => {
    const search = render(<Search />);
    expect(search).toBeTruthy();
  });
});
