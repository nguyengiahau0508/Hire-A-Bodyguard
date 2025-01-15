import { Status } from "src/commons/enums/status.enum";
import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { Service } from "src/modules/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class ServiceRequest extends BaseEntity {
  @Column()
  userId: number

  @ManyToOne(() => Service, (service) => service.serviceRequests)
  @JoinColumn()
  service: Service

  @Column({ type: 'text', nullable: true })
  note: string

  @Column()
  numberOfHours: number

  @Column()
  numberOfGuards: number

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status

  @OneToMany(() => Feedback, (feedback) => feedback.serviceRequest)
  feedbacks: Feedback[]

  @OneToOne(() => Order, (order) => order.serviceRequest)
  @JoinColumn()
  order: Order
}
