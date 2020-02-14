import { Column, Entity } from 'typeorm';
import { BaseZdEntity } from '../database/base.entity';

@Entity()
export class Ticket extends BaseZdEntity {
  @Column()
  type: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @Column()
  status: string;

  @Column()
  submitter_id: number;

  @Column()
  assignee_id: number;

  @Column()
  organization_id: number;

  @Column()
  has_incidents: boolean;

  @Column()
  due_at: string;

  @Column()
  via: string;
}
