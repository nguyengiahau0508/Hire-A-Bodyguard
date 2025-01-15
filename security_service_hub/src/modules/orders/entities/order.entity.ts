import { Status } from "src/commons/enums/status.enum";
import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { File } from "src/modules/files/entities/file.entity";
import { ServiceRequest } from "src/modules/service-requests/entities/service-request.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Order extends BaseEntity {
  @Column()
  userId: number

  @OneToOne(() => ServiceRequest, (serviceRequest) => serviceRequest.order)
  @JoinColumn()
  serviceRequest: ServiceRequest

  @Column({ type: 'double' })
  totalAmount: number

  @Column({ type: 'text' })
  note: string

  @OneToOne(() => File)
  @JoinColumn()
  file: File

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status
}


