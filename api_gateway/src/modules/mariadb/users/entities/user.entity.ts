import { MariadbBaseEntity } from "src/common/entities/mariadb/base.entity";
import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from "typeorm";
import { generateRandomName } from "src/common/utils/random-name.util";
import { Token } from "../../tokens/entities/token.entity";
import { AuthProvider } from "../../auth_providers/entities/auth-provider.entity";
import { Role } from "src/common/enums/authentication/role.enum";
import { Gender } from "src/common/enums/authentication/gender.enum";

@Entity()
export class User extends MariadbBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  picture: string

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  authProvider: AuthProvider;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @Column({ nullable: true })
  phoneNumber: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  birthday: Date

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other
  })
  gender: Gender

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Customer
  })
  role: Role

  @BeforeInsert()
  setName() {
    if (!this.name) {
      this.name = generateRandomName();
    }
  }
}


