import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobService } from './job.service';
import { JOB_MESSAGE } from '../message.pattern';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @MessagePattern(JOB_MESSAGE.CREATE_AND_SAVE)
  async createAndSave(@Payload() dto: any) {
    return {
      data: await this.jobService.createAndSave(dto)
    }
  }

  @MessagePattern(JOB_MESSAGE.FINDALL)
  findAll(@Payload() pageOptionDto: PageOptionsDto) {
    return this.jobService.getAll(pageOptionDto);
  }

  @MessagePattern(JOB_MESSAGE.FINDONE)
  async findOne(@Payload() id: number) {
    return {
      data: await this.jobService.findByCondition({
        where: { id },
        relations: ['jobSkills', "jobSkills.skill"],
      })
    }
  }

  @MessagePattern(JOB_MESSAGE.UPDATE)
  async cupdate(@Payload() payload: { id: number, dto: UpdateJobDto }) {
    const { id, dto } = payload;
    return {
      data: await this.jobService.updateCustom(id, dto)
    }
  }
}
