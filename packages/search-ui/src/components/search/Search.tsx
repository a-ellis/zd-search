import axios from 'axios';
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { SearchForm } from './form/SearchForm';
import { EntityType, SearchEvent, SearchResult } from './interfaces/search.interface';
import { SearchResults } from './results/SearchResults';

interface State {
  searchResults?: SearchResult;
  searchResultsType?: EntityType;
}

export class Search extends Component<{}, State> {
  state: Readonly<State> = {
    searchResults: undefined,
    searchResultsType: undefined
  };

  componentWillUnmount() {
    // cancel any outstanding debounced calls when component unmounts
    this.debouncedSearchEvent.cancel();
  }

  getSearchResults = async ({ entity, field, matcher, value }: SearchEvent) => {
    try {
      const { data } = await axios.get<SearchResult>(`/${entity}/search`, {
        params: {
          field,
          value,
          exact: matcher === 'is'
        }
      });
      this.setState({ searchResults: data, searchResultsType: entity });
    } catch (err) {
      console.error(err);
    }
  }

  debouncedSearchEvent = debounce(this.getSearchResults, 300);

  render() {
    const { searchResults, searchResultsType } = this.state;

    return (
      <>
        <SearchForm onSearchEvent={this.debouncedSearchEvent} />
        <SearchResults results={searchResults} resultType={searchResultsType} />
      </>
    );
  }
};
