import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SearchService } from '../../common/search.service';
import { UserQueryDto } from './user.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

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

  describe('search', () => {
    let field: string;
    let value: string;

    beforeEach(() => {
      field = 'name';
      value = 'Kate';
    });

    it('should call orgService search with find conditions', () => {
      const expectedFindConditions = { [field]: new RegExp(value, 'i') };
      mockSearchService.createFindConditions.mockReturnValueOnce(expectedFindConditions);

      controller.search({ field, value } as UserQueryDto);

      expect(mockSearchService.createFindConditions).toHaveBeenCalledWith(field, value, undefined);
      expect(mockUserService.search).toHaveBeenCalledWith(expectedFindConditions);
    });

    it('should rethrow error from failed creation of find conditions', () => {
      mockSearchService.createFindConditions.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      expect(() => {
        controller.search({field, value} as UserQueryDto);
      }).toThrowError(BadRequestException);
    });

    it('should rethrow error from failed orgService search', () => {
      mockUserService.search.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      expect(() => {
        controller.search({field, value} as UserQueryDto);
      }).toThrowError(InternalServerErrorException);
    });
  });
});
