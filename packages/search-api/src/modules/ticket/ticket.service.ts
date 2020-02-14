import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Repository, FindConditions } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(@InjectRepository(Ticket) private readonly ticketRepo: Repository<Ticket>) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find();
  }

  search(findConditions: FindConditions<Ticket>): Promise<Ticket[]> {
    return this.ticketRepo.find(findConditions);
  }
}
