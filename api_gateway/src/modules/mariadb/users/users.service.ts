import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthProviders } from 'src/common/enums/authentication/auth.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async findLocalAuthUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
        authProvider: {
          provider: AuthProviders.Local
        }
      },
      relations: ['authProvider']
    })
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const entityToUpdate = await this.userRepository.preload({
      id,
      ...updateUserDto
    })
    return await this.userRepository.save(entityToUpdate)
  }
}
