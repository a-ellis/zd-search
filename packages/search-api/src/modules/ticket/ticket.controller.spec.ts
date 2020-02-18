import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { SearchService } from '../../common/search.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { TicketQueryDto } from './ticket.dto';

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

  describe('search', () => {
    let field: string;
    let value: string;

    beforeEach(() => {
      field = 'subject';
      value = 'Whoops!';
    });

    it('should call ticketService search with find conditions', () => {
      const expectedFindConditions = { [field]: new RegExp(value, 'i') };
      const fcOptions = {
        fieldDataTypeReplacements : { _id: 'string' }
      };
      mockSearchService.createFindConditions.mockReturnValueOnce(expectedFindConditions);

      controller.search({field, value} as TicketQueryDto);

      expect(mockSearchService.createFindConditions).toHaveBeenCalledWith(field, value, undefined, fcOptions);
      expect(mockTicketService.search).toHaveBeenCalledWith(expectedFindConditions);
    });

    it('should rethrow error from failed creation of find conditions', () => {
      mockSearchService.createFindConditions.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      expect(() => {
        controller.search({field, value} as TicketQueryDto);
      }).toThrowError(BadRequestException);
    });

    it('should rethrow error from failed orgService search', () => {
      mockTicketService.search.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      expect(() => {
        controller.search({field, value} as TicketQueryDto)
      }).toThrowError(InternalServerErrorException);
    });
  });
});
