import { Controller, Get, Query } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { SearchService } from '../../common/search.service';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketQueryDto } from './ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService, private readonly searchService: SearchService) {}

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('search')
  search(@Query() query: TicketQueryDto) {
    const { field, value, exact } = query;
    const fieldDataTypeReplacements = {
      '_id': 'string'
    };

    try {
      const findConditions: FindConditions<Ticket> = this.searchService.createFindConditions(field, value, exact, { fieldDataTypeReplacements });
      return this.ticketService.search(findConditions);
    } catch (error) {
      throw error;
    }
  }
}
