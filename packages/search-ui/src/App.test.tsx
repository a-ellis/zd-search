import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
  });
});
