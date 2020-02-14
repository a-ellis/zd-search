import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [DatabaseModule, UserModule, TicketModule, OrganizationModule],
})
export class AppModule {}
