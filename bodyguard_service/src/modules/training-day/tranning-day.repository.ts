import { Inject, Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { TrainingDay } from "./entities/training-day.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TranningDayRepository extends BaseAbstractRepository<TrainingDay> {
  constructor(
    @InjectRepository(TrainingDay) private readonly tranningDayRepository: Repository<TrainingDay>
  ) {
    super(tranningDayRepository)
  }
}
