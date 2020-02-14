import { Column, Entity } from 'typeorm';
import { BaseZdEntity } from '../database/base.entity';

@Entity()
export class Organization extends BaseZdEntity {
  @Column()
  name: string;

  @Column()
  domain_names: string[];

  @Column()
  details: string;

  @Column()
  share_tickets: boolean;
}
