import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { BodyguardSerivce } from "./bodyguard.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Role } from "src/common/enums/authentication/role.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { CreateBodyguardDto } from "./dto/create-bodyguard.dto";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateBodyguardDto } from "./dto/update-bodyguard.dto";

@Controller('bodyguards')
export class BodyguardsController {
  constructor(private readonly bodyguardService: BodyguardSerivce) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async createAndSave(@Request() req: any, @Body() dto: CreateBodyguardDto) {
    dto.userId = req.user.sub
    return await this.bodyguardService.createAndSave(dto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.bodyguardService.findById(id)
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.bodyguardService.findAll(pageOptionsDto)
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async update(@Request() req: any, @Param('id') id: number, @Body() dto: UpdateBodyguardDto) {
    dto.userId = req.user.sub
    return await this.bodyguardService.update(id, dto)
  }
}

