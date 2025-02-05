import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Bodyguard } from './entities/bodyguard.entity';
import { BodyguardRepository } from './bodyguard.repository';
import { CreateBodyguardDto } from './dto/create-bodyguard.dto';
import { JobService } from '../job/job.service';
import { RpcException } from '@nestjs/microservices';
import { DeepPartial } from 'typeorm';
import { UpdateBodyguardDto } from './dto/update-bodyguard.dto';

@Injectable()
export class BodyguardService extends BaseService<Bodyguard> {
  constructor(
    private readonly bodyguaraRepository: BodyguardRepository,
    private readonly jobSerivce: JobService
  ) {
    super(bodyguaraRepository)
  }

  async createAndSave(dto: CreateBodyguardDto) {
    const jobEntity = await this.jobSerivce.findOneById(dto.jobId)
    if (!jobEntity) throw new RpcException(`job with id:${dto.jobId} not found`)

    const created = this.bodyguaraRepository.create({
      ...dto,
      job: jobEntity
    })
    return await this.bodyguaraRepository.save(created)
  }

  async updateCustom(id: number, dto: UpdateBodyguardDto) {
    const jobEntity = await this.jobSerivce.findOneById(dto.jobId)
    if (!jobEntity) throw new RpcException(`job with id:${dto.jobId} not found`)

    const existingEntity = await this.repository.findOneById(id);

    if (!existingEntity) {
      throw new RpcException(`Entity with ID ${id} not found`);
    }

    existingEntity.job = jobEntity
    Object.assign(existingEntity, dto);

    return this.repository.save(existingEntity);
  }
}
