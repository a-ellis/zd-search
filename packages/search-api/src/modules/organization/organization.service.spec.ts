import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm/repository/Repository';
import { FindConditions } from 'typeorm';

jest.mock('typeorm/repository/Repository');

describe('OrganizationsService', () => {
  let service: OrganizationService;
  let mockRepo: Repository<Organization>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        { provide: getRepositoryToken(Organization), useClass: Repository }
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    mockRepo = module.get<Repository<Organization>>(getRepositoryToken(Organization));
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

  describe('search', () => {
    it('should call repo find method with supplied find conditions', () => {
      const findConditions: FindConditions<Organization> = { name: 'Kwik-E-Mart' };

      service.search(findConditions);

      expect(mockRepo.find).toBeCalledWith(findConditions);
    });
  });
});
