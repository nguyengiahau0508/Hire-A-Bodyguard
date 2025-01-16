
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Tên của dịch vụ vệ sĩ',
    example: 'Dịch vụ vệ sĩ cá nhân 24/7',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Giá thuê dịch vụ vệ sĩ (tính theo ngày)',
    example: 3000000,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'Mô tả chi tiết về dịch vụ vệ sĩ',
    example: 'Cung cấp vệ sĩ chuyên nghiệp, được đào tạo bài bản để bảo vệ an toàn cá nhân hoặc sự kiện.',
    type: String,
  })
  description: string;
}

