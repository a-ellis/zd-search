import { Controller, Get, Query } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { SearchService } from '../../common/search.service';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService, private readonly searchService: SearchService) {}

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('search')
  search(@Query('key') key: string, @Query('value') value: string, @Query('exact') exact?: string) {
    try {
      const findConditions: FindConditions<Ticket> = this.searchService.createFindConditions(key, value, exact);
      return this.ticketService.search(findConditions);
    } catch (error) {
      throw error;
    }
  }
}
