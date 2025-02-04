import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { TIMESHEET_MESSAGE } from '../message.pattern';

@Controller()
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) { }

  @MessagePattern(TIMESHEET_MESSAGE.CREATE)
  create(@Payload() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetService.create(createTimesheetDto);
  }

  @MessagePattern(TIMESHEET_MESSAGE.FINDALL)
  findAll() {
    return this.timesheetService.findAll();
  }

  @MessagePattern(TIMESHEET_MESSAGE.FINDONE)
  findOne(@Payload() id: number) {
    return this.timesheetService.findOne(id);
  }

  @MessagePattern(TIMESHEET_MESSAGE.UPDATE)
  update(@Payload() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetService.update(updateTimesheetDto.id, updateTimesheetDto);
  }
}
