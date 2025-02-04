import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyguardTranningService } from './bodyguard_tranning.service';
import { CreateBodyguardTranningDto } from './dto/create-bodyguard_tranning.dto';
import { UpdateBodyguardTranningDto } from './dto/update-bodyguard_tranning.dto';
import { BODYGUARD_TRANNING_MESSAGE } from '../message.pattern';

@Controller()
export class BodyguardTranningController {
  constructor(private readonly bodyguardTranningService: BodyguardTranningService) { }

  @MessagePattern(BODYGUARD_TRANNING_MESSAGE.CREATE)
  create(@Payload() createBodyguardTranningDto: CreateBodyguardTranningDto) {
    return this.bodyguardTranningService.create(createBodyguardTranningDto);
  }

  @MessagePattern(BODYGUARD_TRANNING_MESSAGE.FINDALL)
  findAll() {
    return this.bodyguardTranningService.findAll();
  }

  @MessagePattern(BODYGUARD_TRANNING_MESSAGE.FINDONE)
  findOne(@Payload() id: number) {
    return this.bodyguardTranningService.findOne(id);
  }

  @MessagePattern(BODYGUARD_TRANNING_MESSAGE.UPDATE)
  update(@Payload() updateBodyguardTranningDto: UpdateBodyguardTranningDto) {
    return this.bodyguardTranningService.update(updateBodyguardTranningDto.id, updateBodyguardTranningDto);
  }
}
