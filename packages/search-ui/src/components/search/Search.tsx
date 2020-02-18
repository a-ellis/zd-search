import axios from 'axios';
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { SearchForm } from './form/SearchForm';
import { EntityType, SearchEvent, SearchResult } from './interfaces/search.interface';
import { SearchResults } from './results/SearchResults';
import { MATCHER } from './form/dropdown-option.constants';
import { Inline } from '@zendeskgarden/react-loaders';
import { zdColorBlue600 } from '@zendeskgarden/css-variables';
import { Alert, Title } from '@zendeskgarden/react-notifications';

interface State {
  searchResults?: SearchResult;
  searchResultsType?: EntityType;
  loading: boolean;
  showError: boolean;
  error: any;
}

export class Search extends Component<{}, State> {
  state: Readonly<State> = {
    searchResults: undefined,
    searchResultsType: undefined,
    loading: false,
    showError: false,
    error: undefined
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
          exact: matcher === MATCHER.IS
        }
      });
      this.setState({ searchResults: data, searchResultsType: entity, loading: false, showError: false, error: undefined });
    } catch (error) {
      this.setState({ loading: false, showError: true, error  });
      console.error(error);
    }
  }

  debouncedSearchEvent = debounce(this.getSearchResults, 300);

  onSearchEventHandler = (event: SearchEvent) => {
    this.setState({ searchResults: undefined, loading: true });
    this.debouncedSearchEvent(event);
  };

  render() {
    const { searchResults, searchResultsType, loading, showError, error } = this.state;

    return (
      <div aria-busy={loading} aria-live="polite" style={{ position: 'relative' }}>
        <SearchForm onSearchEvent={this.onSearchEventHandler} loading={loading} />
        {loading &&
          <Inline size={64} color={zdColorBlue600} style={{ position: 'absolute', left: 0, right: 0, top: '50vh', margin: 'auto' }}/>
        }
        {!showError &&
          <SearchResults results={searchResults} resultType={searchResultsType} />
        }
        {showError &&
          <Alert type="error" style={{ margin: '50px 10px' }}>
            <Title>Error</Title>
            <div>There was an error completing your request:</div>
            <pre>{error?.message ? error.message : JSON.stringify(error)}</pre>
          </Alert>
        }
      </div>
    );
  }
};
