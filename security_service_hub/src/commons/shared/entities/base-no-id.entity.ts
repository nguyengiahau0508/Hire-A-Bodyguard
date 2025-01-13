import {
  Column,
  CreateDateColumn,
  BaseEntity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

export abstract class NoIdBaseEntity extends TypeOrmEntity {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}
