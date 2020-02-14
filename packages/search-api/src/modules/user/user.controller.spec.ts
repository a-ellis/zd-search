import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SearchService } from '../../common/search.service';

jest.mock('./user.service');
jest.mock('../../common/search.service.ts');

describe('Users Controller', () => {
  let controller: UserController;
  let mockUserService: jest.Mocked<UserService>;
  let mockSearchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, SearchService]
    }).compile();

    controller = module.get<UserController>(UserController);
    mockUserService = module.get<UserService>(UserService) as jest.Mocked<UserService>;
    mockSearchService = module.get<SearchService>(SearchService) as jest.Mocked<SearchService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should request organizations from service', () => {
      controller.findAll();
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });
});
