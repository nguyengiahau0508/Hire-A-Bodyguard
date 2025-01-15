
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Query, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { ApiBearerAuth } from "@nestjs/swagger";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { ServiceRequestsService } from "./serivce-requests.serivce";
import { CreateServiceRequestDto } from "./dto/create-service-request.dto";
import { UpdateServiceRequestDto } from "./dto/update-service-request.dto";

@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly serviceRequestService: ServiceRequestsService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Customer)
  async createAndSave(@Request() req: any, @Body() dto: CreateServiceRequestDto) {
    dto.userId = req.user.sub
    return await this.serviceRequestService.createAndSave(dto);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.serviceRequestService.findAll(pageOptionsDto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.serviceRequestService.findOneById(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async update(@Param('id') id: number, @Body() dto: UpdateServiceRequestDto) {
    return await this.serviceRequestService.update(id, dto)
  }
}
