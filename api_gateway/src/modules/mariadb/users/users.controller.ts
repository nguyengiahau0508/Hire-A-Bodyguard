import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthProviders } from 'src/common/enums/authentication/auth.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    return {
      users: await this.usersService.findAll()
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      user: await this.usersService.findOne(+id)
    }
  }

  @ApiBearerAuth()
  @Patch()
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  async update(@Req() request: any, @Body() updateUserDto: UpdateUserDto) {
    return { user: await this.usersService.update(request.user.sub, updateUserDto) }
  }
}
