import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {

  createFindConditions(field: string, value?: string, exact?: string) {
    if (field && value !== undefined) {
      const exactMatch = exact && exact === 'true';
      let pattern: RegExp | string | number | null = value ? new RegExp(value, 'i') : null;

      if (exactMatch) {
        pattern = value || null;
      }

      if (field === '_id') {
        pattern = pattern && Number.parseInt(pattern as string) || null;
      }

      return { [field]: pattern };

    } else {
      throw new BadRequestException();
    }
  }
}