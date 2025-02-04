import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
  userId: number;

  @ApiProperty({ example: "5 years", description: "Kinh nghiệm làm việc" })
  expierience: string;

  @ApiProperty({ example: "PMP", description: "Chứng chỉ liên quan" })
  certificate: string;

  @ApiProperty({ example: "Good", description: "Tình trạng sức khỏe" })
  health: string;

  @ApiProperty({ example: "Driver License", description: "Giấy phép liên quan" })
  license: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: "Danh sách ID kỹ năng liên quan",
    type: [Number],
  })
  jobSkills: number[];
}

