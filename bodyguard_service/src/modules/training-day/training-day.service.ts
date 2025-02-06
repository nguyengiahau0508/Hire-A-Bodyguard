import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { TrainingDay } from './entities/training-day.entity';
import { TranningDayRepository } from './tranning-day.repository';

@Injectable()
export class TrainingDayService extends BaseService<TrainingDay> {
  constructor(
    private readonly tranningDayRepository: TranningDayRepository
  ) { super(tranningDayRepository) }

  public async deleteMany(ids: number[]): Promise<void> {
    if (!ids || ids.length === 0) {
      throw new Error("ID list cannot be empty.");
    }

    const days = await Promise.all(
      ids.map((id) => this.tranningDayRepository.findOneById(id))
    );

    // Lọc ra các phần tử hợp lệ (không null/undefined)
    const validDays = days.filter((day) => day !== null);

    if (validDays.length === 0) {
      throw new Error("No valid training days found for deletion.");
    }

    await this.tranningDayRepository.removeMany(validDays);
  }
}
