import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BodyguardService } from './bodyguard.service';
import { CreateBodyguardDto } from './dto/create-bodyguard.dto';
import { UpdateBodyguardDto } from './dto/update-bodyguard.dto';
import { BODYGUARD_MESSAGE } from '../message.pattern';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller()
export class BodyguardController {
  constructor(private readonly bodyguardService: BodyguardService) { }

  @MessagePattern(BODYGUARD_MESSAGE.CREATE)
  async create(@Payload() createBodyguardDto: CreateBodyguardDto) {
    return { data: this.bodyguardService.create(createBodyguardDto) };
  }

  @MessagePattern(BODYGUARD_MESSAGE.CREATE_AND_SAVE)
  async createAndSave(@Payload() createBodyguardDto: CreateBodyguardDto) {
    return { data: await this.bodyguardService.createAndSave(createBodyguardDto) };
  }

  @MessagePattern(BODYGUARD_MESSAGE.FINDALL)
  findAll(@Payload() pageOtionDto: PageOptionsDto) {
    return this.bodyguardService.getAll(pageOtionDto);
  }

  @MessagePattern(BODYGUARD_MESSAGE.FINDONE)
  async findOne(@Payload() id: number) {
    return {
      data: await this.bodyguardService.findOneById(id)
    }
  }

  @MessagePattern(BODYGUARD_MESSAGE.UPDATE)
  async update(@Payload() payload: { id: number, dto: UpdateBodyguardDto }) {
    const { id, dto } = payload
    return {
      data: await this.bodyguardService.updateCustom(id, dto)
    }
  }
}
