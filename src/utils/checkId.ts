import { validate, version } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const checkId = (id: string): void => {
  if (validate(id) && version(id) === 4) {
    return;
  } else {
    throw new BadRequestException('Id is invalid (not uuid)');
  }
};
