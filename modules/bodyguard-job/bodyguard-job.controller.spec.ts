import { Test, TestingModule } from '@nestjs/testing';
import { BodyguardJobController } from './bodyguard-job.controller';
import { BodyguardJobService } from './bodyguard-job.service';

describe('BodyguardJobController', () => {
  let controller: BodyguardJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodyguardJobController],
      providers: [BodyguardJobService],
    }).compile();

    controller = module.get<BodyguardJobController>(BodyguardJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
