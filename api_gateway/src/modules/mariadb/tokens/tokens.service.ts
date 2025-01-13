import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
@Injectable()
export class TokensService {
  constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) { }

  async save(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto)
    return await this.tokenRepository.save(token)
  }

  async findTokenByKey(key: string) {
    return await this.tokenRepository.findOne({ where: { key } })
  }

  async revokeToken(key: string): Promise<boolean> {
    const tokenEntity = await this.findTokenByKey(key)

    if (!tokenEntity) return false;

    if (tokenEntity.isRevoked == false) {
      const tokenToUpdate = await this.tokenRepository.preload({
        id: tokenEntity.id,
        isRevoked: true,
      });

      if (tokenToUpdate) {
        await this.tokenRepository.save(tokenToUpdate);
      }
    }

    return true
  }

  async removeExpiredTokens(): Promise<number> {
    const currentDate = new Date();

    const result = await this.tokenRepository.createQueryBuilder()
      .delete()
      .from(Token)
      .where('expiresAt < :currentDate', { currentDate })
      .execute();

    return result.affected || 0; // Return the number of deleted records
  }
}
