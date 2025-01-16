
import { DeepPartial, Entity, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseInterfaceRepository } from './repositories/base.interface.repository';
import { NotFoundException } from '@nestjs/common';
import { PageOptionsDto } from './pagination/dtos';
import { PageMetaDto } from './pagination/page-meta.dto';
import { PageDto } from './pagination/page.dto';
import { RpcException } from '@nestjs/microservices';

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


  async getAll(pageOptionsDto: PageOptionsDto, relations: string[] = []): Promise<PageDto<T>> {
    const queryBuilder = this.repository.createQueryBuilder("entity");

    // Thêm các mối quan hệ được chỉ định
    relations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
    });

    queryBuilder
      .orderBy("entity.createdAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async update(id: number, dto: DeepPartial<T>) {
    const existingEntity = await this.repository.findOneById(id);
    if (!existingEntity) {
      throw new RpcException(`Entity with ID ${id} not found`);
    }

    Object.assign(existingEntity, dto);

    return this.repository.save(existingEntity);
  }
}

