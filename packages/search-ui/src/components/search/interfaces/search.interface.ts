import { Ticket } from './ticket.interface';
import { Organization } from './organization.interface';
import { User } from './user.interface';

export type EntityType = 'users' | 'organizations' | 'tickets';

export interface SearchEvent {
  entity: EntityType;
  field: string;
  matcher: string;
  value: string;
};

export type SearchResult = User[] | Organization[] | Ticket[];

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  type?: 'string' | 'boolean' | 'number' | 'array';
};
