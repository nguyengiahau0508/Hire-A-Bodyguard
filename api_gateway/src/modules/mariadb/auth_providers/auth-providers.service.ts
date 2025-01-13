import { Injectable } from '@nestjs/common';
import { CreateAuthProviderDto } from './dto/create-auth-provider.dto';
import { UpdateAuthProviderDto } from './dto/update-auth-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider } from './entities/auth-provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthProvidersService {
  constructor(
    @InjectRepository(AuthProvider) private readonly authProviderRepository: Repository<AuthProvider>
  ) { }
  async create(createAuthProviderDto: CreateAuthProviderDto) {
    const authProvider = this.authProviderRepository.create(createAuthProviderDto)
    return await this.authProviderRepository.save(authProvider)
  }

  async findByProviderId(id: string) {
    return await this.authProviderRepository.findOne({ where: { providerId: id }, relations: ['user'] })
  }

  findAll() {
    return `This action returns all authProviders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authProvider`;
  }

  update(id: number, updateAuthProviderDto: UpdateAuthProviderDto) {
    return `This action updates a #${id} authProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} authProvider`;
  }
}
