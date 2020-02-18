import { IsIn, IsNotEmpty, IsDefined, IsBooleanString, IsOptional } from 'class-validator';
import { organizationFieldDataTypes } from '../database/utils/data-types.constant';

export class OrganizationQueryDto {
  @IsIn(Object.keys(organizationFieldDataTypes))
  @IsNotEmpty()
  field: string;

  @IsDefined()
  value: string;

  @IsBooleanString()
  @IsOptional()
  exact: string;
}
