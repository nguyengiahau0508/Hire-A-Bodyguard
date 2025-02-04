import { Module } from "@nestjs/common";
import { JobModule } from "./job/job.module";
import { SkillModule } from './skill/skill.module';
import { BodyguardModule } from "./bodyguard/bodyguard.module";
import { BodyguardTranningModule } from "./bodyguard_tranning/bodyguard_tranning.module";
import { SalaryModule } from "./salary/salary.module";
import { TimesheetModule } from "./timesheet/timesheet.module";
import { JobSkillModule } from './job-skill/job-skill.module';

@Module({
  imports: [
    JobModule,
    SkillModule,
    BodyguardModule,
    BodyguardTranningModule,
    SalaryModule,
    TimesheetModule,
    BodyguardTranningModule,
    JobSkillModule
  ]
})
export class FeatureModule { }
