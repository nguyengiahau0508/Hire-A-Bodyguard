import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Bodyguard } from "src/modules/bodyguard/entities/bodyguard.entity";
import { JobSkill } from "src/modules/job-skill/entities/job-skill.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";

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

  @OneToOne(() => Bodyguard, (bodyguard) => bodyguard.job)
  bodyguard: Bodyguard
}
