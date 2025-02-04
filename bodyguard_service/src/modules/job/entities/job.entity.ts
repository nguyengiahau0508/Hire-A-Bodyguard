import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { JobSkill } from "src/modules/job-skill/entities/job-skill.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Job extends BaseEntity {
  @Column()
  userId: number

  @Column()
  expierience: string

  @Column()
  certificate: string

  @Column()
  health: string

  @Column()
  license: string

  @OneToMany(() => JobSkill, (jobSKill) => jobSKill.job)
  jobSkills: JobSkill[]
}
