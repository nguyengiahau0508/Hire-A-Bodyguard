import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillRepository } from './skill.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
  exports: [SkillService]
})
export class SkillModule { }
