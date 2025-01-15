import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { ServiceRequest } from "src/modules/service-requests/entities/service-request.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Service extends BaseEntity {
  @Column()
  name: string

  @Column({ type: 'double' })
  price: number

  @Column({ type: 'text' })
  description: string

  @OneToMany(() => ServiceRequest, (serviceRequest) => serviceRequest.service)
  serviceRequests: ServiceRequest[]
}
