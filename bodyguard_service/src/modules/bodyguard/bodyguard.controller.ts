import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyguardService } from './bodyguard.service';
import { CreateBodyguardDto } from './dto/create-bodyguard.dto';
import { UpdateBodyguardDto } from './dto/update-bodyguard.dto';
import { BODYGUARD_MESSAGE } from '../message.pattern';

@Controller()
export class BodyguardController {
  constructor(private readonly bodyguardService: BodyguardService) { }

  @MessagePattern(BODYGUARD_MESSAGE.CREATE)
  create(@Payload() createBodyguardDto: CreateBodyguardDto) {
    return this.bodyguardService.create(createBodyguardDto);
  }

  @MessagePattern(BODYGUARD_MESSAGE.FINDALL)
  findAll() {
    return this.bodyguardService.findAll();
  }

  @MessagePattern(BODYGUARD_MESSAGE.FINDONE)
  findOne(@Payload() id: number) {
    return this.bodyguardService.findOne(id);
  }

  @MessagePattern(BODYGUARD_MESSAGE.UPDATE)
  update(@Payload() updateBodyguardDto: UpdateBodyguardDto) {
    return this.bodyguardService.update(updateBodyguardDto.id, updateBodyguardDto);
  }
}
