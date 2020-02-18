import React, { Component } from 'react';
import { DropdownOption, EntityType, SearchEvent } from '../interfaces/search.interface';
import { allFieldOptions, entityOptions, exactMatchDataTypes, matcherOptions } from './dropdown-option.constants';
import { SearchDropdown } from './SearchDropdown';
import { SearchValueInput } from './SearchValueInput';

interface Props {
  onSearchEvent: (event: SearchEvent) => void;
}

interface State {
  selectedEntity?: DropdownOption;
  selectedField?: DropdownOption;
  selectedMatcher?: DropdownOption;
  fieldOptionsByEntity?: DropdownOption[];
  filteredMatcherOptions?: DropdownOption[];
  value: string;
}

export class SearchForm extends Component<Props, State> {
  state: Readonly<State> = {
    selectedEntity: undefined,
    selectedField: undefined,
    selectedMatcher: undefined,
    fieldOptionsByEntity: undefined,
    filteredMatcherOptions: undefined,
    value: ''
  };

  emitSearchEvent = () => {
    const { selectedEntity, selectedField, selectedMatcher, value } = this.state;
    if (selectedEntity && selectedField && selectedMatcher) {
      this.props.onSearchEvent({
        entity: selectedEntity.value as EntityType,
        field: selectedField.value,
        matcher: selectedMatcher.value,
        value
      });
    }
  }

  onValueChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => this.setState({ value: currentTarget.value }, this.emitSearchEvent);

  onInputKeydown = ({ keyCode }: KeyboardEvent) => keyCode === 13 && this.emitSearchEvent();

  onSearchButtonClick = () => this.emitSearchEvent();

  fieldTypeRequiresExact = (field?: DropdownOption) => field && exactMatchDataTypes.includes(field.type as string);

  onSelectEntity = (selectedEntity: DropdownOption) => {
    const fieldOptionsByEntity = allFieldOptions[(selectedEntity as DropdownOption<'organizations'| 'tickets' |'users'>).value];
    this.setState({ selectedEntity, fieldOptionsByEntity, selectedField: undefined });
  };

  onSelectField = (selectedField: DropdownOption) => {
    const exactMatch = this.fieldTypeRequiresExact(selectedField);

    const filteredMatcherOptions = exactMatch ?
      matcherOptions.filter(matcher => matcher.value !== 'contains') :
      matcherOptions.slice();

    if (exactMatch && this.state.selectedMatcher?.value === 'contains') {
      this.setState({ selectedMatcher: undefined });
    }

    this.setState({ selectedField, filteredMatcherOptions, value: '' });
  };

  onSelectMatcher = (selectedMatcher: DropdownOption) => {
    if (selectedMatcher.value === 'is_empty') {
      this.setState({ selectedMatcher, value: '' });
    } else {
      this.setState({ selectedMatcher });
    }
  }

  render() {
    const { selectedEntity, selectedField, selectedMatcher, fieldOptionsByEntity, filteredMatcherOptions, value } = this.state;

    return (
      <>
        <SearchDropdown
          selectedOption={selectedEntity}
          dropdownOptions={entityOptions}
          onSelect={this.onSelectEntity}
          placeholder="Select Entity..."
          label="Entity"
        />

        <SearchDropdown
          selectedOption={selectedField}
          dropdownOptions={fieldOptionsByEntity}
          onSelect={this.onSelectField}
          placeholder="Select Field..."
          label="Field"
          disabled={!selectedEntity}
        />

        <SearchDropdown
          selectedOption={selectedMatcher}
          dropdownOptions={filteredMatcherOptions}
          onSelect={this.onSelectMatcher}
          placeholder="Select Matcher..."
          label="Matcher"
          disabled={!selectedField}
        />

        <SearchValueInput
          selectedEntity={selectedEntity}
          selectedField={selectedField}
          selectedMatcher={selectedMatcher}
          onValueChange={this.onValueChange}
          onInputKeyDown={this.onInputKeydown}
          onSearchButtonClick={this.onSearchButtonClick}
          value={value}
          data-testid="search-value-input"
        />
      </>
    );
  }
}
