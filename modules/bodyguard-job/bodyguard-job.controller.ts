import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyguardJobService } from './bodyguard-job.service';
import { CreateBodyguardJobDto } from './dto/create-bodyguard-job.dto';
import { UpdateBodyguardJobDto } from './dto/update-bodyguard-job.dto';

@Controller()
export class BodyguardJobController {
  constructor(private readonly bodyguardJobService: BodyguardJobService) {}

  @MessagePattern('createBodyguardJob')
  create(@Payload() createBodyguardJobDto: CreateBodyguardJobDto) {
    return this.bodyguardJobService.create(createBodyguardJobDto);
  }

  @MessagePattern('findAllBodyguardJob')
  findAll() {
    return this.bodyguardJobService.findAll();
  }

  @MessagePattern('findOneBodyguardJob')
  findOne(@Payload() id: number) {
    return this.bodyguardJobService.findOne(id);
  }

  @MessagePattern('updateBodyguardJob')
  update(@Payload() updateBodyguardJobDto: UpdateBodyguardJobDto) {
    return this.bodyguardJobService.update(updateBodyguardJobDto.id, updateBodyguardJobDto);
  }

  @MessagePattern('removeBodyguardJob')
  remove(@Payload() id: number) {
    return this.bodyguardJobService.remove(id);
  }
}
