import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { Repository, FindConditions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
  constructor(@InjectRepository(Organization) private readonly orgRepo: Repository<Organization>) {}

  findAll(): Promise<Organization[]> {
    return this.orgRepo.find();
  }

  search(findConditions: FindConditions<Organization>): Promise<Organization[]> {
    return this.orgRepo.find(findConditions);
  }
}
