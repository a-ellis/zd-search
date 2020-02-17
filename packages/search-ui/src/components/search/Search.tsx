import React, { Component } from 'react';
import { SearchForm } from './form/SearchForm';
import { SearchEvent } from './interfaces/search.interface';

export class Search extends Component {

  onSearchEvent = (event: SearchEvent) => {

  }

  render() {
    return (
      <SearchForm onSearchEvent={this.onSearchEvent} />
    );
  }
};
