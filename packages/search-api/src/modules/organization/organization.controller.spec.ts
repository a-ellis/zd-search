import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { SearchService } from '../../common/search.service';

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
});
