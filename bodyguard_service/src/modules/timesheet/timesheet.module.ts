import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';

@Module({
  controllers: [TimesheetController],
  providers: [TimesheetService],
})
export class TimesheetModule {}
