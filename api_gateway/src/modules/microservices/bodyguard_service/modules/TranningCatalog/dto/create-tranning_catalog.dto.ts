import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTrainingDayDto } from './create-training-day.dto';

export class CreateTranningCatalogDto {
  @ApiProperty({
    description: 'Tên danh mục đào tạo',
    type: String,
    example: 'Khóa học Fitness cơ bản',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Thời lượng khóa học (phút)',
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Mô tả chi tiết (optional)',
    type: String,
    example: 'Khóa học dành cho người mới bắt đầu',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu (ISO string)',
    type: String,
    format: 'date-time',
    example: '2025-03-01T00:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  start_at: Date;

  @ApiProperty({
    description: 'Thời gian kết thúc (ISO string)',
    type: String,
    format: 'date-time',
    example: '2025-03-10T00:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  end_at: Date;

  @ApiProperty({
    description: 'Danh sách ngày tập luyện (optional)',
    type: () => [CreateTrainingDayDto],
    required: false,
  })
  @IsArray()
  @Type(() => CreateTrainingDayDto)
  @IsOptional()
  days?: CreateTrainingDayDto[];
}
