import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthProvidersService } from './auth-providers.service';
import { CreateAuthProviderDto } from './dto/create-auth-provider.dto';
import { UpdateAuthProviderDto } from './dto/update-auth-provider.dto';

@Controller('auth-providers')
export class AuthProvidersController {
  constructor(private readonly authProvidersService: AuthProvidersService) {}

  @Post()
  create(@Body() createAuthProviderDto: CreateAuthProviderDto) {
    return this.authProvidersService.create(createAuthProviderDto);
  }

  @Get()
  findAll() {
    return this.authProvidersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authProvidersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthProviderDto: UpdateAuthProviderDto) {
    return this.authProvidersService.update(+id, updateAuthProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authProvidersService.remove(+id);
  }
}
