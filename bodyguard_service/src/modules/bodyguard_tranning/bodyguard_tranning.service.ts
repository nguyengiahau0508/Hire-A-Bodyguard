import { Injectable } from '@nestjs/common';
import { CreateBodyguardTranningDto } from './dto/create-bodyguard_tranning.dto';
import { UpdateBodyguardTranningDto } from './dto/update-bodyguard_tranning.dto';

@Injectable()
export class BodyguardTranningService {
  create(createBodyguardTranningDto: CreateBodyguardTranningDto) {
    return 'This action adds a new bodyguardTranning';
  }

  findAll() {
    return `This action returns all bodyguardTranning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyguardTranning`;
  }

  update(id: number, updateBodyguardTranningDto: UpdateBodyguardTranningDto) {
    return `This action updates a #${id} bodyguardTranning`;
  }

  remove(id: number) {
    return `This action removes a #${id} bodyguardTranning`;
  }
}
