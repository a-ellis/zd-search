import { Dropdown, Item, Menu, Trigger } from '@zendeskgarden/react-dropdowns';
import { OverflowButton } from '@zendeskgarden/react-tables';
import React from 'react';

interface Props {
  onSelect: (selectedOption: { value: string }) => void;
}

export const OverflowMenu = ({onSelect}: Props) => {
  return (
    <Dropdown onSelect={onSelect}>
      <Trigger>
        <OverflowButton aria-label="Row actions" />
      </Trigger>
      <Menu
        placement="bottom-end"
        style={{ marginTop: 0 }}
        popperModifiers={{
          preventOverflow: {
            boundariesElement: 'viewport'
          },
          flip: {
            enabled: false
          },
          offset: {
            fn: data => {
              /**
               * Ensure correct placement relative to trigger
               **/
              data.offsets.popper.top -= 2;
              return data;
            }
          }
        }}
      >
        <Item value="view_raw">View Raw Data</Item>
      </Menu>
    </Dropdown>
  )
};
