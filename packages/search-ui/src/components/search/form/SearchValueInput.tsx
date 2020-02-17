import { Field, Input, Label, Radio } from '@zendeskgarden/react-forms';
import React, { Component } from 'react';
import { DropdownOption } from '../interfaces/search.interface';
import { Button } from '@zendeskgarden/react-buttons';

interface Props {
  onValueChange: () => void;
  onInputKeyDown: () => void;
  onSearchButtonClick: () => void;
  entity?: DropdownOption;
  field?: DropdownOption;
  matcher?: DropdownOption;
  value?: string;
}

export class SearchValueInput extends Component<Props> {
  render() {
      const { entity, field, matcher, value, onValueChange, onInputKeyDown, onSearchButtonClick } = this.props;

      if (field?.type === 'boolean') {
        return (
          <Field>
            <Label>Value</Label>
            <Field>
              <Radio
                name="bool-value-options"
                value="true"
                checked={value === 'true'}
                onChange={onValueChange}
              >
                <Label>True</Label>
              </Radio>
            </Field>
            <Field>
              <Radio
                name="bool-value-options"
                value="false"
                checked={value === 'false'}
                onChange={onValueChange}
              >
                <Label>False</Label>
              </Radio>
            </Field>
          </Field>
        )
      } else {
        return matcher?.value === 'is_empty' ? (
          <Button
            stretched
            className="u-mv"
            onClick={onSearchButtonClick}
            disabled={!entity || !field}
          >
            Search
          </Button>
        ) : (
          <Field>
            <Label>Value</Label>
            <Input
              placeholder="Enter search value..."
              onChange={onValueChange}
              onKeyDown={onInputKeyDown}
              value={value}
              disabled={!entity || !field || !matcher}
            />
          </Field>
        );
      }
    };
  }
