import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { Job } from "./entities/job.entity";
import { Repository } from 'typeorm'

@Injectable()
export class JobRepository extends BaseAbstractRepository<Job> {
  constructor(@InjectRepository(Job) readonly jobRepository: Repository<Job>) {
    super(jobRepository)
  }
}
