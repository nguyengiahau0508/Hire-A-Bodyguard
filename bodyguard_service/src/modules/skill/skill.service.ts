import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Skill } from './entities/skill.entity';
import { SkillRepository } from './skill.repository';

@Injectable()
export class SkillService extends BaseService<Skill> {
  constructor(private readonly skillRepository: SkillRepository) {
    super(skillRepository)
  }
}
