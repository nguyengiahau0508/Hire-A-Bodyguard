import { Module } from "@nestjs/common";
import { SalariesController } from "./salaries.controller";

@Module({
  controllers: [SalariesController]
})
export class SalariesModule { }
