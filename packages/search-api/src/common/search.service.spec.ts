import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { BadRequestException } from '@nestjs/common';

jest.mock('typeorm/repository/Repository');

describe('UsersService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFindConditions', () => {

    describe('without exact match param', () => {

      it('should return find condition with RegExp', () => {
        const testKey = 'name';
        const testValue = 'John';
        const expectedResult = { [testKey]: new RegExp(testValue, 'i')};

        const fc = service.createFindConditions(testKey, testValue);

        expect(fc).toEqual(expectedResult);
      });

      it('should return find condition for null field', () => {
        const testKey = 'name';
        const testValue = '';
        const expectedResult = { name: null };

        const fc = service.createFindConditions(testKey, testValue);

        expect(fc).toEqual(expectedResult);
      });
    });

    describe('with exact match param "true"', () => {

      it('should return find condition on exact value', () => {
        const exactMatch = 'true';
        const testKey = 'name';
        const testValue = 'some-exact-value';
        const expectedResult = { [testKey]: testValue };

        const fc = service.createFindConditions(testKey, testValue, exactMatch);

        expect(fc).toEqual(expectedResult);
      });

      it('should return find condition for null field if value empty', () => {
        const exactMatch = 'true';
        const testKey = 'name';
        const testValue = '';
        const expectedResult = { [testKey]: null };

        const fc = service.createFindConditions(testKey, testValue, exactMatch);

        expect(fc).toEqual(expectedResult);
      });

      it('should not use exact match if param is something other than "true"', () => {
        const exactMatch = 'something-else-but-technically-truthy';
        const testKey = 'name';
        const testValue = '';
        const expectedResult = { [testKey]: null };

        const fc = service.createFindConditions(testKey, testValue, exactMatch);

        expect(fc).toEqual(expectedResult);
      });
    });

    describe('with empty key param', () => {

      it('should throw BadRequestException', () => {
        const testKey = undefined;
        const testValue = 'some-value';

        expect(() => {
          service.createFindConditions(testKey, testValue)
        }).toThrowError(BadRequestException);
      });
    });

    describe('with undefined value param', () => {

      it('should throw BadRequestException', () => {
        const testKey = 'some-key';
        const testValue = undefined;

        expect(() => {
          service.createFindConditions(testKey, testValue)
        }).toThrowError(BadRequestException);
      });
    });

  });
});
