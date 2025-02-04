import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateJobDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  expierience: string

  @IsString()
  @IsNotEmpty()
  certificate: string

  @IsString()
  @IsNotEmpty()
  health: string

  @IsString()
  @IsNotEmpty()
  license: string

  jobSkills: number[]
}
