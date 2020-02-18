import { IsNotEmpty, IsDefined, IsBooleanString, IsOptional, IsIn } from 'class-validator';
import { userFieldDataTypes } from '../database/utils/data-types.constant';

export class UserQueryDto {
  @IsIn(Object.keys(userFieldDataTypes))
  @IsNotEmpty()
  field: string;

  @IsDefined()
  value: string;

  @IsBooleanString()
  @IsOptional()
  exact: string;
}
