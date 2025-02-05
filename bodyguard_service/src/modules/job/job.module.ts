import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';
import { JobSkillModule } from '../job-skill/job-skill.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    JobSkillModule,
    SkillModule
  ],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobService]
})
export class JobModule { }
