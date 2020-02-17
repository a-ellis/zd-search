export type EntityType = 'users' | 'organizations' | 'tickets';

export interface SearchEvent {
  entity: EntityType;
  field: string;
  matcher: string;
  value: string;
};

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  type?: 'string' | 'boolean' | 'number' | 'array';
};
