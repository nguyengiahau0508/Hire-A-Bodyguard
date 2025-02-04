import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { SALARY_MESSAGE } from '../message.pattern';

@Controller()
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }

  @MessagePattern(SALARY_MESSAGE.CREATE)
  create(@Payload() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.create(createSalaryDto);
  }

  @MessagePattern(SALARY_MESSAGE.FINDALL)
  findAll() {
    return this.salaryService.findAll();
  }

  @MessagePattern(SALARY_MESSAGE.FINDONE)
  findOne(@Payload() id: number) {
    return this.salaryService.findOne(id);
  }

  @MessagePattern(SALARY_MESSAGE.UPDATE)
  update(@Payload() updateSalaryDto: UpdateSalaryDto) {
    return this.salaryService.update(updateSalaryDto.id, updateSalaryDto);
  }
}
