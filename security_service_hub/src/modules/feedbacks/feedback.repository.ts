
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/commons/shared/repositories/base.abstract.repository';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackRepository extends BaseAbstractRepository<Feedback> {
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) {
    super(repository);
  }
}
