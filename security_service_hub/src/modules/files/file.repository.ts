
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { BaseAbstractRepository } from 'src/commons/shared/repositories/base.abstract.repository';

@Injectable()
export class FileRepository extends BaseAbstractRepository<File> {
  constructor(@InjectRepository(File) repository: Repository<File>) {
    super(repository);
  }
}
