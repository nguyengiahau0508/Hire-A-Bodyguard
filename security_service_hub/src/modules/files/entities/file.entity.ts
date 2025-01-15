
import { FileMimeType, FileProvider } from "src/commons/enums/file.enum";
import { BaseEntity } from "src/commons/shared/entities/base.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class File extends BaseEntity {
  @Column()
  url: string;

  @Column()
  providerId: string;

  @Column({
    type: 'enum',
    enum: FileMimeType,
    default: FileMimeType.OTHER,
  })
  type: FileMimeType;

  @Column({
    type: 'enum',
    enum: FileProvider,
    default: FileProvider.LOCAL,
  })
  provider: FileProvider;
}

