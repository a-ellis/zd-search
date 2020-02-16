import React from 'react';
import { render } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('should render', () => {
    const navigation = render(<Navigation />);
    expect(navigation).toBeTruthy();
  });
});
