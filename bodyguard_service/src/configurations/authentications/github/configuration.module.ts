import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import configuration from './configuration';
import { GithubAuthConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        GITHUB_CLIENT_ID: Joi.string().required(),
        GITHUB_CLIENT_SECRET: Joi.string().required()
      })
    })
  ],
  providers: [GithubAuthConfigurationService],
  exports: [GithubAuthConfigurationService]
})
export class GithubAuthConfigurationModule { }
