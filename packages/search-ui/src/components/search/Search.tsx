import React, { Component } from 'react';
import { SearchForm } from './form/SearchForm';
import { SearchEvent, EntityType } from './interfaces/search.interface';
import axios from 'axios';
import { debounce } from 'lodash';

interface State {
  searchResults?: any[];
  searchResultsType?: EntityType;
}

export class Search extends Component<{}, State> {
  state: Readonly<State> = {
    searchResults: undefined,
    searchResultsType: undefined
  };

  getSearchResults = async ({ entity, field, matcher, value }: SearchEvent) => {
    try {
      const { data } = await axios.get(`/${entity}/search`, {
        params: {
          field,
          value,
          exact: !!(matcher === 'is')
        }
      });
      this.setState({ searchResults: data, searchResultsType: entity });
    } catch (err) {
      console.error(err);
    }
  }

  debouncedSearchEvent = debounce(this.getSearchResults, 300);

  render() {
    return (
      <SearchForm onSearchEvent={this.debouncedSearchEvent} />
    );
  }
};
