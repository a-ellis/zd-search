import React from 'react';
import { render, waitForElement } from '../../../utils/test-utils';
import { DropdownOption } from '../interfaces/search.interface';
import { entityOptions } from './dropdown-option.constants';
import { EntityDropdown } from './EntityDropdown';

describe('EntityDropdown', () => {
  const selectPlaceholderText = 'Select Data Type...';

  it('renders', () => {
    const { baseElement } = render(<EntityDropdown />);

    expect(baseElement).toBeVisible();
  });

  it('renders list of entity options in dropdown', async () => {
    const { getByText } = render(<EntityDropdown />);
    const selectEl = getByText(selectPlaceholderText);

    selectEl.click();

    const usersOption = await waitForElement(() => getByText(entityOptions[0].label));
    const organizationsOption = await waitForElement(() => getByText(entityOptions[1].label));
    const ticketsOption = await waitForElement(() => getByText(entityOptions[2].label));

    expect(usersOption).toBeVisible();
    expect(organizationsOption).toBeVisible();
    expect(ticketsOption).toBeVisible();
  });

  it('displays selected entity', async () => {
    let mockEntity;
    const mockOnSelecEntity = (entity: DropdownOption) => mockEntity = { ...entity };

    const { getByText, rerender } = render(<EntityDropdown onSelectEntity={mockOnSelecEntity} entity={mockEntity} />);
    const selectEl = getByText(selectPlaceholderText);

    selectEl.click();

    const usersOption = await waitForElement(() => getByText(entityOptions[0].label));

    usersOption.click();

    rerender(<EntityDropdown onSelectEntity={mockOnSelecEntity} entity={mockEntity} />);

    expect(getByText('Users')).toBeVisible();

    expect(selectEl.textContent).toBe('Users');
  });
});
