import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TranningCatalogService } from "./tranning-catalog.service";
import { CreateTranningCatalogDto } from "./dto/create-tranning_catalog.dto";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateTranningCatalogDto } from "./dto/update-tranning_catalog.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('tranning-catalog')
export class TranningCatalogController {
  constructor(private readonly tranningCatalogService: TranningCatalogService) { }

  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async createAndSave(@Body() dto: CreateTranningCatalogDto) {
    return this.tranningCatalogService.createAndSave(dto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.tranningCatalogService.findById(id)
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.tranningCatalogService.findAll(pageOptionsDto)
  }

  @Patch('id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() dto: UpdateTranningCatalogDto) {
    return this.tranningCatalogService.update(id, dto)
  }
}
