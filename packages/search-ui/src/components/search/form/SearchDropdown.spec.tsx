import React from 'react';
import { render, waitForElement } from '../../../utils/test-utils';
import { DropdownOption } from '../interfaces/search.interface';
import { entityOptions } from './dropdown-option.constants';
import { SearchDropdown } from './SearchDropdown';

describe('SearchDropdown', () => {
  const selectLabelText = 'Entity';
  const selectPlaceholderText = 'Select Entity...';
  const getDefaultProps = () => ({
    label: selectLabelText,
    placeholder: selectPlaceholderText,
    dropdownOptions: entityOptions
  });

  it('renders', () => {
    const { baseElement } = render(<SearchDropdown />);

    expect(baseElement).toBeVisible();
  });

  it('renders list of options in dropdown', async () => {
    const { getByText } = render(<SearchDropdown {...getDefaultProps()} />);
    const selectEl = getByText(selectPlaceholderText);

    selectEl.click();

    const usersOption = await waitForElement(() => getByText(entityOptions[0].label));
    const organizationsOption = await waitForElement(() => getByText(entityOptions[1].label));
    const ticketsOption = await waitForElement(() => getByText(entityOptions[2].label));

    expect(usersOption).toBeVisible();
    expect(organizationsOption).toBeVisible();
    expect(ticketsOption).toBeVisible();
  });

  it('displays selected option', async () => {
    let mockEntity;
    const mockOnSelecEntity = (entity: DropdownOption) => mockEntity = { ...entity };

    const { getByText, rerender } = render(<SearchDropdown {...getDefaultProps()} onSelect={mockOnSelecEntity} selectedOption={mockEntity} />);
    const selectEl = getByText(selectPlaceholderText);

    selectEl.click();

    const usersOption = await waitForElement(() => getByText(entityOptions[0].label));

    usersOption.click();

    rerender(<SearchDropdown {...getDefaultProps()} onSelect={mockOnSelecEntity} selectedOption={mockEntity} />);

    expect(getByText('Users')).toBeVisible();

    expect(selectEl.textContent).toBe('Users');
  });
});
