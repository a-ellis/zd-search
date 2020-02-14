import { ObjectIdColumn, Column } from 'typeorm';

export abstract class BaseZdEntity {
  @ObjectIdColumn()
  _id: number;

  @Column()
  url: string;

  @Column()
  external_id: string;

  @Column()
  tags: string[];

  @Column()
  created_at: string;
}
