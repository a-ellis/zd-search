import React, { FunctionComponent } from 'react';
import { DropdownOption } from '../interfaces/search.interface';
import { Dropdown, Select, Menu, Item, Field, Label } from '@zendeskgarden/react-dropdowns';
import { entityOptions } from './dropdown-option.constants';

interface Props {
  entity?: DropdownOption;
  onSelectEntity?: (entity: DropdownOption<'organizations'| 'tickets' |'users'>) => void;
}

export const EntityDropdown: FunctionComponent<Props> = ({ entity, onSelectEntity}: Props) => (
  <Dropdown
    onSelect={onSelectEntity}
    downshiftProps={{ itemToString: (item: DropdownOption) => item && item.label }}
  >
    <Field>
      <Label>Data Type</Label>
      <Select>{entity?.label || 'Select Data Type...'}</Select>
    </Field>
    <Menu>
      {entityOptions.map(option => (
        <Item key={option.value} value={option}>
          {option.label}
        </Item>
      ))}
    </Menu>
  </Dropdown>
);
