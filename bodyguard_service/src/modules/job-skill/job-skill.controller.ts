import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobSkillService } from './job-skill.service';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
import { UpdateJobSkillDto } from './dto/update-job-skill.dto';

@Controller()
export class JobSkillController {
  constructor(private readonly jobSkillService: JobSkillService) { }

  @MessagePattern('createJobSkill')
  create(@Payload() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.create(createJobSkillDto);
  }

  @MessagePattern('findAllJobSkill')
  findAll() {
    return this.jobSkillService.findAll();
  }

  @MessagePattern('findOneJobSkill')
  findOne(@Payload() id: number) {
  }

  @MessagePattern('updateJobSkill')
  update(@Payload() updateJobSkillDto: UpdateJobSkillDto) {
    return this.jobSkillService.update(updateJobSkillDto.id, updateJobSkillDto);
  }

  @MessagePattern('removeJobSkill')
  remove(@Payload() id: number) {
  }
}
