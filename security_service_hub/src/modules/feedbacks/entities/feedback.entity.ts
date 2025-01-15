import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { ServiceRequest } from "src/modules/service-requests/entities/service-request.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Feedback extends BaseEntity {
  @Column()
  userId: number

  @Column({ type: "text" })
  content: string

  @ManyToOne(() => ServiceRequest, (serviceRequest) => serviceRequest.feedbacks)
  @JoinColumn()
  serviceRequest: ServiceRequest
}
