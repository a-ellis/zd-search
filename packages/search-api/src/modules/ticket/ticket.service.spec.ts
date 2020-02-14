import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { Repository } from 'typeorm/repository/Repository';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('typeorm/repository/Repository');

describe('TicketsService', () => {
  let service: TicketService;
  let mockRepo: Repository<Ticket>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: getRepositoryToken(Ticket), useClass: Repository }
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    mockRepo = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call repo find method', () => {
      service.findAll();
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });
});
