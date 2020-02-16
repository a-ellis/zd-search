import React from 'react';
import { render } from '@testing-library/react';
import { PageContent } from './PageContent';

describe('PageContent', () => {
  it('should render', () => {
    const pageContent = render(<PageContent />);
    expect(pageContent).toBeTruthy();
  });
});
