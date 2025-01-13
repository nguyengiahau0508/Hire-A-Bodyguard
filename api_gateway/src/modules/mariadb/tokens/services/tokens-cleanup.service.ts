
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';

@Injectable()
export class TokensCleanupService {
  private readonly logger = new Logger(TokensCleanupService.name);

  constructor(private readonly tokensService: TokensService) { }

  @Cron(CronExpression.EVERY_HOUR) // Runs every hour
  async cleanExpiredTokens() {
    this.logger.log('Starting expired tokens cleanup process...');
    const deletedCount = await this.tokensService.removeExpiredTokens();
    this.logger.log(`Cleanup completed. Removed ${deletedCount} expired tokens.`);
  }
}
