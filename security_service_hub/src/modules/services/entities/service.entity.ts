import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Service extends BaseEntity {
  @Column()
  name: string

  @Column({ type: 'double' })
  price: number

  @Column({ type: 'text' })
  description: string
}
