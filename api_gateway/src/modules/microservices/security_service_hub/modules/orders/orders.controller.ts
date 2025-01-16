
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { DeleteEmptyFieldsInterceptor } from "src/common/decorators/delete-empty-fields.decorator";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Order creation payload with file upload',
    schema: {
      type: 'object',
      properties: {
        serviceRequestId: { type: 'number', description: 'ID của yêu cầu dịch vụ' },
        totalAmount: { type: 'number', description: 'Tổng số tiền của đơn hàng' },
        note: { type: 'string', description: 'Ghi chú' },
        file: { type: 'string', format: 'binary', description: 'File đính kèm' },
      },
    },
  })
  async createAndSave(
    @Request() req: any,
    @Body() dto: CreateOrderDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    dto.userId = req.user.sub;
    return await this.ordersService.createAndSave(dto, file);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.ordersService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.ordersService.findOneById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'), DeleteEmptyFieldsInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Order update payload with file upload',
    schema: {
      type: 'object',
      properties: {
        serviceRequestId: { type: 'number', description: 'ID của yêu cầu dịch vụ', nullable: true },
        totalAmount: { type: 'number', description: 'Tổng số tiền của đơn hàng', nullable: true },
        note: { type: 'string', description: 'Ghi chú', nullable: true },
        file: { type: 'string', format: 'binary', description: 'File đính kèm', nullable: true },
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateOrderDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.ordersService.update(id, dto, file);
  }
}

