import { BadRequestException, Injectable } from '@nestjs/common';
import { fieldDataTypes, DATA_TYPE } from '../modules/database/utils/data-types.constant';

export interface FindConditionOptions {
  fieldDataTypeReplacements?: { [key: string]: string | boolean | number | [] };
}

@Injectable()
export class SearchService {

  createFindConditions(field: string, value?: string, exact?: string, options?: FindConditionOptions) {
    if (field && value !== undefined) {
      const dataTypes = {
        ...fieldDataTypes,
        ...options?.fieldDataTypeReplacements
      };

      const exactMatch = exact && exact === 'true';
      let pattern: RegExp | string | number | boolean | null = value ? new RegExp(value, 'i') : null;

      if (exactMatch) {
        pattern = value || null;
      }

      if (dataTypes[field] === DATA_TYPE.BOOLEAN) {
        pattern = pattern == null ? null : value === 'true' || !(value === 'false');
      }

      if (dataTypes[field] === DATA_TYPE.NUMBER) {
        pattern = +value;
        if (Number.isNaN(pattern)) {
          if (field === '_id')
          throw new BadRequestException();
        }
      }

      return { [field]: pattern };

    } else {
      throw new BadRequestException();
    }
  }
}