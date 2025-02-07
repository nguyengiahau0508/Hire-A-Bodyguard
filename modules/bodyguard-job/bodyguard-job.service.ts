import { Injectable } from '@nestjs/common';
import { CreateBodyguardJobDto } from './dto/create-bodyguard-job.dto';
import { UpdateBodyguardJobDto } from './dto/update-bodyguard-job.dto';

@Injectable()
export class BodyguardJobService {
  create(createBodyguardJobDto: CreateBodyguardJobDto) {
    return 'This action adds a new bodyguardJob';
  }

  findAll() {
    return `This action returns all bodyguardJob`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyguardJob`;
  }

  update(id: number, updateBodyguardJobDto: UpdateBodyguardJobDto) {
    return `This action updates a #${id} bodyguardJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} bodyguardJob`;
  }
}
