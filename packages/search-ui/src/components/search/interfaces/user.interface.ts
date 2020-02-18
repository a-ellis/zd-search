import { BaseEntity } from './base-entity.interface';

export interface User extends BaseEntity {
  name: string;
  alias: string;
  active: boolean;
  verified: boolean;
  shared: boolean;
  locale: string;
  timezone: string;
  last_login_at: string;
  email: string;
  phone: string;
  signature: string;
  organization_id: number;
  suspended: boolean;
  role: string;
};
