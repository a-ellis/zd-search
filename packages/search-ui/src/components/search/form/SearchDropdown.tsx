import React, { FunctionComponent } from 'react';
import { DropdownOption } from '../interfaces/search.interface';
import { Dropdown, Select, Menu, Item, Field, Label } from '@zendeskgarden/react-dropdowns';

interface Props {
  selectedOption?: DropdownOption;
  label?: string;
  placeholder?: string;
  dropdownOptions?: DropdownOption[];
  disabled?: boolean;
  onSelect?: (selectedOption: DropdownOption) => void;
}

export const SearchDropdown: FunctionComponent<Props> = ({ selectedOption, dropdownOptions, label, placeholder, disabled, onSelect }: Props) => (
  <Dropdown
    onSelect={onSelect}
    downshiftProps={{ itemToString: (item: DropdownOption) => item && item.label }}
  >
    <Field>
      <Label>{label}</Label>
      <Select disabled={disabled}>{selectedOption?.label || placeholder}</Select>
    </Field>
    <Menu>
      {dropdownOptions?.map(option => (
        <Item key={option.value} value={option}>
          {option.label}
        </Item>
      ))}
    </Menu>
  </Dropdown>
);
