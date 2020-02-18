import { IsIn, IsNotEmpty, IsDefined, IsBooleanString, IsOptional } from 'class-validator';
import { ticketFieldDataTypes } from '../database/utils/data-types.constant';

export class TicketQueryDto {
  @IsIn(Object.keys(ticketFieldDataTypes))
  @IsNotEmpty()
  field: string;

  @IsDefined()
  value: string;

  @IsBooleanString()
  @IsOptional()
  exact: string;
}
