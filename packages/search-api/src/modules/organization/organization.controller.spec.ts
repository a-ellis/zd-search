import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { SearchService } from '../../common/search.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { OrganizationQueryDto } from './organization.dto';

jest.mock('./organization.service');
jest.mock('../../common/search.service.ts');

describe('Organizations Controller', () => {
  let controller: OrganizationController;
  let mockOrgService: jest.Mocked<OrganizationService>;
  let mockSearchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [OrganizationService, SearchService]
    })
    .compile();

    controller = module.get<OrganizationController>(OrganizationController);
    mockOrgService = module.get<OrganizationService>(OrganizationService) as jest.Mocked<OrganizationService>;
    mockSearchService = module.get<SearchService>(SearchService) as jest.Mocked<SearchService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should request organizations from service', () => {
      controller.findAll();
      expect(mockOrgService.findAll).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    let field: string;
    let value: string;

    beforeEach(() => {
      field = 'name';
      value = 'Planet Express';
    });

    it('should call orgService search with find conditions', () => {
      const expectedFindConditions = { [field]: new RegExp(value, 'i') };
      mockSearchService.createFindConditions.mockReturnValueOnce(expectedFindConditions);

      controller.search({field, value} as OrganizationQueryDto);

      expect(mockSearchService.createFindConditions).toHaveBeenCalledWith(field, value, undefined);
      expect(mockOrgService.search).toHaveBeenCalledWith(expectedFindConditions);
    });

    it('should rethrow error from failed creation of find conditions', () => {
      mockSearchService.createFindConditions.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      expect(() => {
        controller.search({field, value} as OrganizationQueryDto);
      }).toThrowError(BadRequestException);
    });

    it('should rethrow error from failed orgService search', () => {
      mockOrgService.search.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      expect(() => {
        controller.search({field, value} as OrganizationQueryDto);
      }).toThrowError(InternalServerErrorException);
    });
  });
});
