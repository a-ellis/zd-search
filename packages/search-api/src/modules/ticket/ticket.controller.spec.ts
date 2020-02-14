import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { SearchService } from '../../common/search.service';

jest.mock('./ticket.service');
jest.mock('../../common/search.service.ts');

describe('Tickets Controller', () => {
  let controller: TicketController;
  let mockTicketService: jest.Mocked<TicketService>;
  let mockSearchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService, SearchService]
    }).compile();

    controller = module.get<TicketController>(TicketController);
    mockTicketService = module.get<TicketService>(TicketService) as jest.Mocked<TicketService>;
    mockSearchService = module.get<SearchService>(SearchService) as jest.Mocked<SearchService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should request tickets from service', () => {
      controller.findAll();
      expect(mockTicketService.findAll).toHaveBeenCalled();
    });
  });
});
