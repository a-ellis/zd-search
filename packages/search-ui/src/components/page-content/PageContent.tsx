import { Body, Content, Header, HeaderItemWrapper, Main } from '@zendeskgarden/react-chrome';
import React, { Component } from 'react';
import { Search } from '../search/Search';

export class PageContent extends Component {

  render() {
    return (
      <Body>
        <Header standalone>
          <HeaderItemWrapper maxX>
            <span>Zendesk Search</span>
          </HeaderItemWrapper>
        </Header>

        <Content>
          <Main style={{ padding: '20px'}}>
            <Search />
          </Main>
        </Content>
      </Body>
    );
  }
};
