import { Resolver } from '@nestjs/graphql';
import { WorkerService } from './worker.service';

@Resolver('Worker')
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}
}
