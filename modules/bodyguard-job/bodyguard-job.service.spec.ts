import { Test, TestingModule } from '@nestjs/testing';
import { BodyguardJobService } from './bodyguard-job.service';

describe('BodyguardJobService', () => {
  let service: BodyguardJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyguardJobService],
    }).compile();

    service = module.get<BodyguardJobService>(BodyguardJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
