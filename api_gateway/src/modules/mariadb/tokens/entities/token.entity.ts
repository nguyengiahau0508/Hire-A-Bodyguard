import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Token extends MariadbBaseEntity {
  @Column({ type: 'text' })
  key: string

  @Column('varchar', { length: 20 })
  type: string;

  @Column('boolean', { default: false })
  isRevoked: boolean;

  @Column('timestamp')
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
