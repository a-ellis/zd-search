import React, { Component } from 'react';
import { SearchEvent } from '../interfaces/search.interface';
import { SearchValueInput } from './SearchValueInput';
import { EntityDropdown } from './EntityDropdown';

interface Props {
  onSearchEvent: (event: SearchEvent) => void;
}

export class SearchForm extends Component<Props> {

  emitSearchEvent = () => {

  }

  onValueChange = () => {

  }

  onInputKeydown = () => {

  }

  onSearchButtonClick = () => {

  }

  render() {
    return (
      <>
        <EntityDropdown />

        <SearchValueInput
          onValueChange={this.onValueChange}
          onInputKeyDown={this.onInputKeydown}
          onSearchButtonClick={this.onSearchButtonClick}
          data-testid="search-value-input"
        />
      </>
    )
  }
}
