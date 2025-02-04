import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { Skill } from "./entities/skill.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SkillRepository extends BaseAbstractRepository<Skill> {
  constructor(@InjectRepository(Skill) private readonly skillRepository: Repository<Skill>) {
    super(skillRepository)
  }
}
