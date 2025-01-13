
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseInterfaceRepository } from './repositories/base.interface.repository';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseService<T> {
  constructor(protected readonly repository: BaseInterfaceRepository<T>) { }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.createMany(data);
  }

  save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.saveMany(data);
  }

  findOneById(id: any): Promise<T> {
    return this.repository.findOneById(id);
  }

  findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return this.repository.findByCondition(filterCondition);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.findAll(options);
  }

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return this.repository.findWithRelations(relations);
  }

  remove(data: T): Promise<T> {
    return this.repository.remove(data);
  }

  preload(entityLike: DeepPartial<T>): Promise<T> {
    return this.repository.preload(entityLike);
  }

  async update(id: any, updateData: DeepPartial<T>): Promise<T> {
    // Attempt to preload the entity with updated data
    const entity = await this.repository.preload({ id, ...updateData });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    // Save the updated entity
    return this.repository.save(entity);
  }
}

