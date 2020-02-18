import { Caption, Table } from '@zendeskgarden/react-tables';
import React, { FunctionComponent } from 'react';
import { EntityType } from '../interfaces/search.interface';
import { UserTableContent } from './UserTableContent';
import { zdSpacing, zdSpacingSm } from'@zendeskgarden/css-variables';
import { OrganizationTableContent } from './OrganizationTableContent';
import { TicketTableContent } from './TicketTableContent';

interface Props {
  results?: any[];
  resultType?: EntityType;
}

export const SearchResults: FunctionComponent<Props> = ({ results, resultType }: Props) => {
  const renderTableContent = () => {
    switch(resultType) {
      case 'users':
        return <UserTableContent users={results} />
      case 'organizations':
        return <OrganizationTableContent organizations={results} />
      case 'tickets':
        return <TicketTableContent tickets={results} />
    }
  };

  const renderCaption = () => (
    <>
      {results?.length &&
        <small style={{ marginLeft: zdSpacingSm }}>
          Showing {results.length} {results.length > 1 ? resultType : resultType?.replace(/s+$/, '')}
        </small>
      }
    </>
  );

  return (
    <>
      { results?.length === 0 ? (
          <h3>No Results</h3>
        ) : (
          <Table scrollable="calc(50vh)">
            {results?.length &&
              <>
                <Caption style={{ marginTop: zdSpacing }}>{ renderCaption() }</Caption>
                { renderTableContent() }
              </>
            }
          </Table>
        )
      }
    </>
  );
};
