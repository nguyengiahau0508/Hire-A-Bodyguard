import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SKILL_MESSAGE } from '../message.pattern';

@Controller()
export class SkillController {
  constructor(private readonly skillService: SkillService) { }

  @MessagePattern(SKILL_MESSAGE.CREATE)
  create(@Payload() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @MessagePattern(SKILL_MESSAGE.FINDALL)
  findAll() {
    return this.skillService.findAll();
  }

  @MessagePattern(SKILL_MESSAGE.FINDONE)
  findOne(@Payload() id: number) {
    return this.skillService.findOneById(id);
  }

  @MessagePattern(SKILL_MESSAGE.UPDATE)
  update(@Payload() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(updateSkillDto.id, updateSkillDto);
  }
}
