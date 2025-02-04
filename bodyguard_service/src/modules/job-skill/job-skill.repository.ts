import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { JobSkill } from "./entities/job-skill.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class JobSkillRepository extends BaseAbstractRepository<JobSkill> {
  constructor(
    @InjectRepository(JobSkill) private readonly jobSkillRepository: Repository<JobSkill>
  ) {
    super(jobSkillRepository)
  }
}
