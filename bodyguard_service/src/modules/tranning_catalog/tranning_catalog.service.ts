import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { TrainingCatalog } from './entities/tranning_catalog.entity';
import { TranningCatalogRepository } from './tranning_catalog.repository';
import { CreateTranningCatalogDto } from './dto/create-tranning_catalog.dto';
import { validateTrainingCatalog } from 'src/commons/helpers/tranning-catalog/validate-training-catalog';
import { TrainingDayService } from '../training-day/training-day.service';
import { TrainingDay } from '../training-day/entities/training-day.entity';
import { UpdateTranningCatalogDto } from './dto/update-tranning_catalog.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TranningCatalogService extends BaseService<TrainingCatalog> {
  constructor(
    private readonly tranningCatalogRepository: TranningCatalogRepository,
    private readonly tranningDayService: TrainingDayService
  ) { super(tranningCatalogRepository) }

  async createAndSave(data: CreateTranningCatalogDto): Promise<TrainingCatalog> {
    validateTrainingCatalog(data);

    const trainingCatalog = this.tranningCatalogRepository.create({
      name: data.name,
      duration: data.duration,
      description: data.description,
      start_at: data.start_at,
      end_at: data.end_at,
    });

    const savedCatalog = await this.tranningCatalogRepository.save(trainingCatalog);

    if (data.days) {
      const trainingDays = data.days.map(day => {
        return this.tranningDayService.create({
          day: day.day,
          trainingCatalog: savedCatalog,
        });
      });

      const tranningDayEntities: TrainingDay[] = await this.tranningDayService.saveMany(trainingDays);
      trainingCatalog.days = tranningDayEntities
      await this.tranningCatalogRepository.save(trainingCatalog)
    }

    return this.tranningCatalogRepository.findByCondition({ where: { id: savedCatalog.id }, relations: ['days'] })
  }

  async updateCustome(id: number, dto: UpdateTranningCatalogDto): Promise<TrainingCatalog> {
    const existingCatalog = await this.tranningCatalogRepository.findByCondition({
      where: { id },
      relations: ['days'],
    });

    if (!existingCatalog) {
      throw new RpcException(`Training catalog with ID ${id} not found.`);
    }

    // Chỉ validate nếu có start_at, end_at, days, duration
    validateTrainingCatalog({
      ...existingCatalog,
      ...dto,
    });

    // Cập nhật thông tin catalog (chỉ cập nhật khi có giá trị mới)
    Object.assign(existingCatalog, {
      name: dto.name ?? existingCatalog.name,
      duration: dto.duration ?? existingCatalog.duration,
      description: dto.description ?? existingCatalog.description,
      start_at: dto.start_at ?? existingCatalog.start_at,
      end_at: dto.end_at ?? existingCatalog.end_at,
    });

    // Nếu có danh sách ngày mới, xử lý cập nhật days
    if (dto.days) {
      const oldDayIds = existingCatalog.days.map(day => day.id);
      if (oldDayIds.length > 0) {
        await this.tranningDayService.deleteMany(oldDayIds);
      }

      const trainingDays = dto.days.map(day => ({
        day: day.day,
        trainingCatalog: existingCatalog,
      }));

      existingCatalog.days = await this.tranningDayService.saveMany(trainingDays);
    }

    // Lưu catalog đã cập nhật
    await this.tranningCatalogRepository.save(existingCatalog);

    // Trả về dữ liệu mới
    return this.tranningCatalogRepository.findByCondition({ where: { id }, relations: ['days'] });
  }
}
