import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { Ticket } from '../../ticket/ticket.entity';
import { Organization } from '../../organization/organization.entity';

export const MONGO_CONFIG = {
  HOST: 'localhost',
  PORT: 27017,
  DATABASE: 'zd-search'
};

export const mongoConnectionOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: MONGO_CONFIG.HOST,
  port: MONGO_CONFIG.PORT,
  database: MONGO_CONFIG.DATABASE,
  entities: [User, Ticket, Organization],
  synchronize: true,
  useUnifiedTopology: true
};
