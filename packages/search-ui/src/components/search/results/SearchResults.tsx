import { zdSpacing, zdSpacingSm } from '@zendeskgarden/css-variables';
import { Body, Close, Header, Modal } from '@zendeskgarden/react-modals';
import { Notification, Title } from '@zendeskgarden/react-notifications';
import { Caption, Table } from '@zendeskgarden/react-tables';
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { Organization } from '../interfaces/organization.interface';
import { EntityType } from '../interfaces/search.interface';
import { Ticket } from '../interfaces/ticket.interface';
import { User } from '../interfaces/user.interface';
import { OrganizationTableContent } from './OrganizationTableContent';
import { TicketTableContent } from './TicketTableContent';
import { UserTableContent } from './UserTableContent';

interface Props {
  results?: any[];
  resultType?: EntityType;
}

interface State {
  showModal: boolean;
  modalData?: User | Organization | Ticket;
}

export class SearchResults extends Component<Props, State> {
  state: Readonly<State> = {
    showModal: false,
    modalData: undefined
  };

  renderTableContent = () => {
    const { results, resultType } = this.props;

    switch(resultType) {
      case 'users':
        return <UserTableContent users={results} onShowData={modalData => this.setState({ showModal: true, modalData })} />
      case 'organizations':
        return <OrganizationTableContent organizations={results} onShowData={modalData => this.setState({ showModal: true, modalData })} />
      case 'tickets':
        return <TicketTableContent tickets={results} onShowData={modalData => this.setState({ showModal: true, modalData })} />
    }
  };

  renderCaption = () => {
    const { results, resultType } = this.props;

    return (
      <>
        {results?.length &&
          <small style={{ marginLeft: zdSpacingSm }}>
            Showing {results.length} {results.length > 1 ? resultType : resultType?.replace(/s+$/, '')}
          </small>
        }
      </>
      );
  };

  onModalClose = () => this.setState({ showModal: false, modalData: undefined });

  render() {
    const { results, resultType } = this.props;
    const { showModal, modalData } = this.state;

    return (
      <>
        { results?.length === 0 ? (
            <Notification type="info" style={{ margin: '50px 10px' }}>
              <Title>No Results Found</Title>
              There were no {resultType} found with the current search paramaters.
            </Notification>
          ) : (
            <Table scrollable="calc(60vh)">
              {results?.length &&
                <>
                  <Caption style={{ marginTop: zdSpacing }}>{ this.renderCaption() }</Caption>
                  { this.renderTableContent() }
                </>
              }
            </Table>
          )
        }
        {showModal && modalData &&
          <Modal large onClose={this.onModalClose}>
            <Header>Viewing Raw Data</Header>
            <Body>
              <ReactJson src={modalData} />
            </Body>
            <Close aria-label="Close modal" data-testid="modal-close-button" />
          </Modal>
        }
      </>
    );
  }

};
