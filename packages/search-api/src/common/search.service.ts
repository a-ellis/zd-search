import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {

  createFindConditions(key: string, value?: string, exact?: string) {
    if (key && value !== undefined) {
      const exactMatch = exact && exact === 'true';
      let pattern: RegExp | string | null = value ? new RegExp(value, 'i') : null;

      if (exactMatch) {
        pattern = value || null;
      }

      return { [key]: pattern };

    } else {
      throw new BadRequestException();
    }
  }
}