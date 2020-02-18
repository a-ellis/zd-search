import { BaseEntity } from './base-entity.interface';

export interface Ticket extends BaseEntity {
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  has_incidents: boolean;
  due_at: string;
  via: string;
};
