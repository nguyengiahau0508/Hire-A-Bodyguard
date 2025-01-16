
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Query, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { ApiBearerAuth } from "@nestjs/swagger";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { FeedbacksService } from "./feedbacks.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Customer)
  async createAndSave(@Request() req: any, @Body() dto: CreateFeedbackDto) {
    dto.userId = req.user.sub
    return await this.feedbacksService.createAndSave(dto);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.feedbacksService.findAll(pageOptionsDto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.feedbacksService.findOneById(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async update(@Request() req: any, @Param('id') id: number, @Body() dto: UpdateFeedbackDto) {
    dto.userId = req.user.sub
    return await this.feedbacksService.update(id, dto)
  }
}
