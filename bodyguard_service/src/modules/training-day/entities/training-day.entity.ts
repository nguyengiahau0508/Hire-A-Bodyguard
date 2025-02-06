import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { TrainingCatalog } from "src/modules/tranning_catalog/entities/tranning_catalog.entity";
import { Column, ManyToOne, Entity } from "typeorm";

@Entity()
export class TrainingDay extends BaseEntity {
  @Column()
  day: Date

  @ManyToOne(() => TrainingCatalog, (trainingCatalog) => trainingCatalog.days, { onDelete: 'CASCADE' })
  trainingCatalog: TrainingCatalog;
}
