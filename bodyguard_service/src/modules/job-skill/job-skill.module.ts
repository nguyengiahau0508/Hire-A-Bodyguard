import { Module } from '@nestjs/common';
import { JobSkillService } from './job-skill.service';
import { JobSkillController } from './job-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSkill } from './entities/job-skill.entity';
import { JobSkillRepository } from './job-skill.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobSkill])],
  controllers: [JobSkillController],
  providers: [JobSkillService, JobSkillRepository],
  exports: [JobSkillService]
})
export class JobSkillModule { }
