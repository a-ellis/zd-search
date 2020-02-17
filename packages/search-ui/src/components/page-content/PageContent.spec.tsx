import React from 'react';
import { PageContent } from './PageContent';
import { render } from '../../utils/test-utils';

describe('PageContent', () => {
  it('should render', () => {
    const { baseElement } = render(<PageContent />);
    expect(baseElement).toBeVisible();
  });
});
