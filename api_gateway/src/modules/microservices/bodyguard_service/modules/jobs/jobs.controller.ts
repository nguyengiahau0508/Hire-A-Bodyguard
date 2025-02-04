import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Role } from "src/common/enums/authentication/role.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { CreateJobDto } from "./dto/create-job.dto";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateJobDto } from "./dto/update-job.dto";


@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService
  ) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Customer)
  async createAndSave(@Request() req: any, @Body() dto: CreateJobDto) {
    dto.userId = req.user.sub
    return await this.jobsService.createAndSave(dto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.jobsService.findById(id)
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.jobsService.findAll(pageOptionsDto)
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  async update(@Request() req: any, @Param('id') id: number, @Body() dto: UpdateJobDto) {
    console.log(id)
    dto.userId = req.user.sub
    return await this.jobsService.update(id, dto)
  }
}
