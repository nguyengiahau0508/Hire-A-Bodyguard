
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Query, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "src/authentications/guard/jwt.juard";
import { RolesGuard } from "src/authentications/guard/role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "src/modules/mariadb/users/entities/user.entity";

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Customer)
  async createAndSave(@Request() req: any, @Body() dto: CreateTransactionDto) {
    return await this.transactionsService.createAndSaveToDb(dto);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.transactionsService.findAll(pageOptionsDto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.transactionsService.findOneById(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Admin)
  async update(@Param('id') id: number, @Body() dto: UpdateTransactionDto) {
    return await this.transactionsService.update(id, dto)
  }

  @ApiBearerAuth()
  @Post('payment/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Customer)
  async payment(@Request() req: any, @Param('id') id: number) {
    const user: User = req.user
    return this.transactionsService.createPayment(id, user)
  }
}
