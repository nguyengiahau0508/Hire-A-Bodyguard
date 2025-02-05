import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Job } from "src/modules/job/entities/job.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Bodyguard extends BaseEntity {
  @Column()
  userId: number

  @Column()
  orderId: number

  @OneToOne(() => Job, (job) => job.bodyguard)
  @JoinColumn()
  job: Job
}
