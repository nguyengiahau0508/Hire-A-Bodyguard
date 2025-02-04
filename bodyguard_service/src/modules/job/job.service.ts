import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { JobRepository } from './job.repository';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JobSkillService } from '../job-skill/job-skill.service';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import { RpcException } from '@nestjs/microservices';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService extends BaseService<Job> {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly jobSkillService: JobSkillService,
    private readonly skillService: SkillService
  ) {
    super(jobRepository)
  }

  async createAndSave(dto: CreateJobDto) {
    const { jobSkills, ...jobData } = dto;
    const createdJob = this.jobRepository.create(jobData);

    const skills: Skill[] = await Promise.all(
      (dto.jobSkills || []).map(async (id: number) => {
        const skill = await this.skillService.findOneById(id);
        if (!skill) throw new RpcException(`Skill with id: ${id} not found`);
        return skill;
      })
    );

    const savedJob = await this.jobRepository.save(createdJob)

    const jobSkillsDto = skills.map((skill) => ({ job: savedJob, skill: skill }));
    const createdManyJobSkills = this.jobSkillService.createMany(jobSkillsDto)
    const savedManyJobSkills = await this.jobSkillService.saveMany(createdManyJobSkills)
    createdJob.jobSkills = savedManyJobSkills

    await this.jobRepository.save(createdJob)
    return await this.jobRepository.findByCondition({
      where: { id: savedJob.id },
      relations: ['jobSkills', "jobSkills.skill"],
    })
  }

  async updateCustom(id: number, dto: UpdateJobDto) {
    const { jobSkills, ...jobData } = dto;

    const existingJob = await this.jobRepository.findByCondition({
      where: { id },
      relations: ['jobSkills', 'jobSkills.skill'],
    });

    if (!existingJob) throw new RpcException(`Job with id: ${id} not found`);

    Object.assign(existingJob, jobData);
    const updatedJob = await this.jobRepository.save(existingJob);

    if (jobSkills) {
      const skills: Skill[] = await Promise.all(
        jobSkills.map(async (id: number) => {
          const skill = await this.skillService.findOneById(id);
          if (!skill) throw new RpcException(`Skill with id: ${id} not found`);
          return skill;
        })
      );

      await this.jobSkillService.deleteByJobId(id);

      const jobSkillsDto = skills.map((skill) => ({ job: updatedJob, skill }));
      const createdManyJobSkills = this.jobSkillService.createMany(jobSkillsDto);
      const savedManyJobSkills = await this.jobSkillService.saveMany(createdManyJobSkills);

      updatedJob.jobSkills = savedManyJobSkills;
      await this.jobRepository.save(updatedJob);
    }

    return await this.jobRepository.findByCondition({
      where: { id },
      relations: ['jobSkills', "jobSkills.skill"],
    })
  }
}
