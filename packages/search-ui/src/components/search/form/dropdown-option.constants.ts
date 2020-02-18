import { DropdownOption } from '../interfaces/search.interface';

export enum FIELD_DATA_TYPE {
  STRING = 'string',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  ARRAY = 'array'
};

export const exactMatchDataTypes = [
  'boolean',
  'number'
];

export const entityOptions: DropdownOption[] = [
  { label: 'Users', value: 'users' },
  { label: 'Organizations', value: 'organizations' },
  { label: 'Tickets', value: 'tickets' },
];

export const matcherOptions: DropdownOption[] = [
  { label: 'Is', value: 'is'},
  { label: 'Contains', value: 'contains'},
  { label: 'Is Empty', value: 'is_empty'},
];

const baseEntityFields: DropdownOption[] = [
  { label: 'ID', value: '_id', type: FIELD_DATA_TYPE.NUMBER },
  { label: 'Url', value: 'url', type: FIELD_DATA_TYPE.STRING },
  { label: 'External ID', value: 'external_id', type: FIELD_DATA_TYPE.STRING },
  { label: 'Tags', value: 'tags', type: FIELD_DATA_TYPE.ARRAY },
  { label: 'Created At', value: 'created_at', type: FIELD_DATA_TYPE.STRING },
];

const organizationFieldOptions: DropdownOption[] = [
  ...baseEntityFields,
  { label: 'Name', value: 'name', type: FIELD_DATA_TYPE.STRING },
  { label: 'Domain Names', value: 'domain_names', type: FIELD_DATA_TYPE.ARRAY },
  { label: 'Details', value: 'details', type: FIELD_DATA_TYPE.STRING },
  { label: 'Shared Tickets', value: 'shared_tickets', type: FIELD_DATA_TYPE.BOOLEAN },
];

const ticketFieldOptions: DropdownOption[] = [
  ...baseEntityFields,
  { label: 'Type', value: 'type', type: FIELD_DATA_TYPE.STRING },
  { label: 'Subject', value: 'subject', type: FIELD_DATA_TYPE.STRING },
  { label: 'Description', value: 'description', type: FIELD_DATA_TYPE.STRING },
  { label: 'Priority', value: 'priority', type: FIELD_DATA_TYPE.STRING },
  { label: 'Status', value: 'status', type: FIELD_DATA_TYPE.STRING },
  { label: 'Submitter ID', value: 'submitter_id', type: FIELD_DATA_TYPE.NUMBER },
  { label: 'Assignee ID', value: 'assignee_id', type: FIELD_DATA_TYPE.NUMBER },
  { label: 'Organization ID', value: 'organization_id', type: FIELD_DATA_TYPE.NUMBER },
  { label: 'Has Incidents', value: 'has_incidents', type: FIELD_DATA_TYPE.BOOLEAN },
  { label: 'Due At', value: 'due_at', type: FIELD_DATA_TYPE.STRING },
  { label: 'Via', value: 'via', type: FIELD_DATA_TYPE.STRING },
];

const userFieldOptions: DropdownOption[] = [
  ...baseEntityFields,
  { label: 'Name', value: 'name', type: FIELD_DATA_TYPE.STRING },
  { label: 'Alias', value: 'alias', type: FIELD_DATA_TYPE.STRING },
  { label: 'Active', value: 'active', type: FIELD_DATA_TYPE.BOOLEAN },
  { label: 'Verified', value: 'verified', type: FIELD_DATA_TYPE.BOOLEAN },
  { label: 'Shared', value: 'shared', type: FIELD_DATA_TYPE.BOOLEAN },
  { label: 'Locale', value: 'locale', type: FIELD_DATA_TYPE.STRING },
  { label: 'Timezone', value: 'timezone', type: FIELD_DATA_TYPE.STRING },
  { label: 'Last Login At', value: 'last_login_at', type: FIELD_DATA_TYPE.STRING },
  { label: 'Email', value: 'email', type: FIELD_DATA_TYPE.STRING },
  { label: 'Phone', value: 'phone', type: FIELD_DATA_TYPE.STRING },
  { label: 'Signature', value: 'signature', type: FIELD_DATA_TYPE.STRING },
  { label: 'Organization ID', value: 'organization_id', type: FIELD_DATA_TYPE.NUMBER },
  { label: 'Suspended', value: 'suspended', type: FIELD_DATA_TYPE.BOOLEAN },
  { label: 'Role', value: 'role', type: FIELD_DATA_TYPE.STRING }
];

export const allFieldOptions = {
  organizations: organizationFieldOptions,
  tickets: ticketFieldOptions,
  users: userFieldOptions,
};
