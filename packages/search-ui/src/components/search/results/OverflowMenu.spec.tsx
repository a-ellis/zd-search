import React from 'react';
import { OverflowMenu } from './OverflowMenu';
import { render, wait } from '../../../utils/test-utils';

const getDefaultProps = (props?: { onSelect: (selection: { value: string }) => void }) => ({
  onSelect: jest.fn(),
  ...props
});

describe('OverflowMenu', () => {
  it('renders', () => {
    const { baseElement } = render(<OverflowMenu {...getDefaultProps()} />);

    expect(baseElement).toBeVisible();
  });

  it('renders menu on click', async () => {
    const { getByText, getByRole } = render(<OverflowMenu {...getDefaultProps()} />);

    getByRole('combobox').click();

    await wait(() => {
      expect(getByText('View Raw Data')).toBeVisible();
    });
  });

  it('menu option triggers callback', async () => {
    const mockOnSelect = jest.fn();
    const { getByText, getByRole } = render(<OverflowMenu {...getDefaultProps({ onSelect: mockOnSelect })} />);

    getByRole('combobox').click();
    getByText('View Raw Data').click();

    expect(mockOnSelect).toHaveBeenCalled();
  });
});
