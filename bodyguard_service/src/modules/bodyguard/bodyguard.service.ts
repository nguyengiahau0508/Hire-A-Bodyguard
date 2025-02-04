import { Injectable } from '@nestjs/common';
import { CreateBodyguardDto } from './dto/create-bodyguard.dto';
import { UpdateBodyguardDto } from './dto/update-bodyguard.dto';

@Injectable()
export class BodyguardService {
  create(createBodyguardDto: CreateBodyguardDto) {
    return 'This action adds a new bodyguard';
  }

  findAll() {
    return `This action returns all bodyguard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyguard`;
  }

  update(id: number, updateBodyguardDto: UpdateBodyguardDto) {
    return `This action updates a #${id} bodyguard`;
  }

  remove(id: number) {
    return `This action removes a #${id} bodyguard`;
  }
}
