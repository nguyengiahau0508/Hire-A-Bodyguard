import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Job } from "src/modules/job/entities/job.entity";
import { Skill } from "src/modules/skill/entities/skill.entity";
import { ManyToOne, Entity } from "typeorm";

@Entity()
export class JobSkill extends BaseEntity {
  @ManyToOne(() => Job, (job) => job.jobSkills)
  job: Job

  @ManyToOne(() => Skill)
  skill: Skill
}
