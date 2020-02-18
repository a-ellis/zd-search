import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { BaseZdEntity } from '../database/base.entity';

@Entity()
export class Organization extends BaseZdEntity {
  @ObjectIdColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  domain_names: string[];

  @Column()
  details: string;

  @Column()
  shared_tickets: boolean;
}
