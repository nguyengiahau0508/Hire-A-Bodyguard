import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { BaseInterfaceRepository } from './base.interface.repository';
import { BaseEntity } from '../entities/base.entity';

interface HasId {
  id: any;
}

export abstract class BaseAbstractRepository<T extends BaseEntity>
  implements BaseInterfaceRepository<T> {
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }
  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }
  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return await this.entity.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }
  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.entity.createQueryBuilder(alias);
  }

  public async removeMany(entities: T[]): Promise<T[]> {
    return await this.entity.remove(entities);
  }
}
