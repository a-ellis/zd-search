import { Field, MediaInput, Label, Radio } from '@zendeskgarden/react-forms';
import React, { Component } from 'react';
import { DropdownOption } from '../interfaces/search.interface';
import { Button } from '@zendeskgarden/react-buttons';
import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/26/search.svg';
import { MATCHER } from './dropdown-option.constants';
import { Spinner } from '@zendeskgarden/react-loaders';
import { zdColorBlue500 } from '@zendeskgarden/css-variables';

interface Props {
  onValueChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onInputKeyDown: (event: KeyboardEvent) => void;
  onSearchButtonClick: () => void;
  selectedEntity?: DropdownOption;
  selectedField?: DropdownOption;
  selectedMatcher?: DropdownOption;
  value?: string;
  loading?: boolean;
}

export class SearchValueInput extends Component<Props> {
  render() {
      const { selectedEntity, selectedField, selectedMatcher, value, loading, onValueChange, onInputKeyDown, onSearchButtonClick } = this.props;

      if (selectedField?.type === 'boolean' && selectedMatcher?.value !== MATCHER.IS_EMPTY) {
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
        return selectedMatcher?.value === MATCHER.IS_EMPTY ? (
          <Button
            stretched
            className="u-mv"
            onClick={onSearchButtonClick}
            disabled={!selectedEntity || !selectedField}
          >
            Search
          </Button>
        ) : (
          <Field>
            <Label>Value</Label>
            <MediaInput
              placeholder="Enter search value..."
              onChange={onValueChange}
              onKeyDown={onInputKeyDown}
              value={value}
              disabled={!selectedEntity || !selectedField || !selectedMatcher}
              end={loading ? <Spinner delayMS={0} duration={800} size="100px" color={zdColorBlue500} /> : <SearchIcon/>}
              />
          </Field>
        );
      }
    };
  }
