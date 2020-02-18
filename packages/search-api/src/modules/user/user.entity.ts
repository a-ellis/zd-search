import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { BaseZdEntity } from '../database/base.entity';

@Entity()
export class User extends BaseZdEntity {
  @ObjectIdColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @Column()
  active: boolean;

  @Column()
  verified: boolean;

  @Column()
  shared: boolean;

  @Column()
  locale: string;

  @Column()
  timezone: string;

  @Column()
  last_login_at: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  signature: string;

  @Column()
  organization_id: number;

  @Column()
  suspended: boolean;

  @Column()
  role: string;
}
