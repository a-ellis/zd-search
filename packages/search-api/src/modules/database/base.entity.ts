import { ObjectIdColumn, Column } from 'typeorm';

export abstract class BaseZdEntity {
  @Column()
  url: string;

  @Column()
  external_id: string;

  @Column()
  tags: string[];

  @Column()
  created_at: string;
}
