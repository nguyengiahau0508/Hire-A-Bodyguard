import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/commons/shared/entities/base.entity';
import { TrainingDay } from 'src/modules/training-day/entities/training-day.entity';

@Entity()
export class TrainingCatalog extends BaseEntity {

  @Column({ length: 255 })
  name: string;

  @Column()
  duration: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp' })
  start_at: Date;

  @Column({ type: 'timestamp' })
  end_at: Date;

  @OneToMany(() => TrainingDay, (trainingDay) => trainingDay.trainingCatalog, { cascade: true })
  days: TrainingDay[];
}

