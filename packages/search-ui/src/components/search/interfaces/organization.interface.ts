import { BaseEntity } from './base-entity.interface';

export interface Organization extends BaseEntity {
  name: string;
  domain_names: string[];
  details: string;
  shared_tickets: boolean;
};
