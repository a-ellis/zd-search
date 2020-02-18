export enum DATA_TYPE {
  NUMBER = 'number',
  STRING = 'string',
  ARRAY = 'array',
  BOOLEAN = 'boolean'
};

const baseFieldDataTypes = {
  '_id': DATA_TYPE.NUMBER,
  'url': DATA_TYPE.STRING,
  'external_id': DATA_TYPE.STRING,
  'tags': DATA_TYPE.ARRAY,
  'created_at': DATA_TYPE.STRING
};

export const userFieldDataTypes = {
  ...baseFieldDataTypes,
  'name': DATA_TYPE.STRING,
  'alias': DATA_TYPE.STRING,
  'active': DATA_TYPE.BOOLEAN,
  'verified': DATA_TYPE.BOOLEAN,
  'shared': DATA_TYPE.BOOLEAN,
  'locale': DATA_TYPE.STRING,
  'timezone': DATA_TYPE.STRING,
  'last_login_at': DATA_TYPE.STRING,
  'email': DATA_TYPE.STRING,
  'phone': DATA_TYPE.STRING,
  'signature': DATA_TYPE.STRING,
  'organization_id': DATA_TYPE.NUMBER,
  'suspended': DATA_TYPE.BOOLEAN,
  'role': DATA_TYPE.STRING,
};

export const organizationFieldDataTypes = {
  ...baseFieldDataTypes,
  'name': DATA_TYPE.STRING,
  'domain_names': DATA_TYPE.ARRAY,
  'details': DATA_TYPE.STRING,
  'shared_tickets': DATA_TYPE.BOOLEAN
};

export const ticketFieldDataTypes = {
  ...baseFieldDataTypes,
  'type': DATA_TYPE.STRING,
  'subject': DATA_TYPE.STRING,
  'description': DATA_TYPE.STRING,
  'priority': DATA_TYPE.STRING,
  'status': DATA_TYPE.STRING,
  'submitter_id': DATA_TYPE.NUMBER,
  'assignee_id': DATA_TYPE.NUMBER,
  'organization_id': DATA_TYPE.NUMBER,
  'has_incidents': DATA_TYPE.BOOLEAN,
  'due_at': DATA_TYPE.STRING,
  'via': DATA_TYPE.STRING,
};

export const fieldDataTypes = {
  ...userFieldDataTypes,
  ...organizationFieldDataTypes,
  ...ticketFieldDataTypes
};
