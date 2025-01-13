
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Query } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { ApiPaginatedResponse } from "src/common/decorators/api-paginated-response.decorator";

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async createAndSave(@Body() createServiceDto: CreateServiceDto) {
    return await this.servicesService.createAndSaveToDb(createServiceDto);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.servicesService.findAll(pageOptionsDto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.servicesService.findOneById(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async update(@Param('id') id: number, @Body() dto: UpdateServiceDto) {
    return await this.servicesService.update(id, dto)
  }
}
