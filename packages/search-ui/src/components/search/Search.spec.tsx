import React from 'react';
import { Search } from './Search';
import { render } from '../../utils/test-utils';

describe('Search', () => {
  it('should render', () => {
    const { baseElement } = render(<Search />);
    expect(baseElement).toBeVisible();
  });
});
