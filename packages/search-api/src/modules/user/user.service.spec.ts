import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('typeorm/repository/Repository');

describe('UsersService', () => {
  let service: UserService;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
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
