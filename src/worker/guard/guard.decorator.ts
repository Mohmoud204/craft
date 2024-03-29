import { SetMetadata } from '@nestjs/common';

export const Guard = (...args: string[]) => SetMetadata('guard', args);
