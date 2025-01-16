import { Status } from "src/commons/enums/status.enum";
import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Transaction extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.transactions)
  order: Order

  @Column()
  paymentTerm: Date

  @Column({ nullable: true })
  paymentDate: Date

  @Column()
  amount: number

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status
}
