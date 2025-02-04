import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Skill extends BaseEntity {
  @Column()
  name: string
}
