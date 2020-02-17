import React from 'react';
import { Navigation } from './Navigation';
import { render } from '../../utils/test-utils';

describe('Navigation', () => {
  it('should render', () => {
    const { baseElement } = render(<Navigation />);
    expect(baseElement).toBeVisible();
  });
});
