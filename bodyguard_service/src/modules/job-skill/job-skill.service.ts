import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { JobSkill } from './entities/job-skill.entity';
import { JobSkillRepository } from './job-skill.repository';

@Injectable()
export class JobSkillService extends BaseService<JobSkill> {
  constructor(
    private readonly jobSkillRepository: JobSkillRepository
  ) {
    super(jobSkillRepository)
  }

  async deleteByJobId(jobId: number) {
    const jobSkills = await this.jobSkillRepository.findAll({ where: { job: { id: jobId } }, relations: ['job'] });
    await this.jobSkillRepository.removeMany(jobSkills);
  }
}
