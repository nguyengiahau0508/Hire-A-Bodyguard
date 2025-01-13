import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokensCleanupService } from './services/tokens-cleanup.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    ScheduleModule.forRoot()
  ],
  controllers: [TokensController],
  providers: [TokensService, TokensCleanupService],
  exports: [TokensService]
})
export class TokensModule { }
