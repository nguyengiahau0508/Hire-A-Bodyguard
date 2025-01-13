import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class AuthProvider extends MariadbBaseEntity {
  @Column()
  provider: string

  @Column({ nullable: true })
  providerId: string

  @Column({ nullable: true })
  passwordHash: string

  @OneToOne(() => User, (user) => user.authProvider, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
