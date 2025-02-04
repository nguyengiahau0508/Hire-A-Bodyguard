import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config";
import * as Joi from 'joi'
import { MomoConfigService } from "./config.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MOMO_ACCESS_KEY: Joi.required(),
        MOMO_SECRET_KEY: Joi.required(),
        MOMO_PARTNER_CODE: Joi.required(),
        MOMO_REDIRECT_URL: Joi.required(),
        MOMO_IPN_URL: Joi.required(),
      })
    })
  ],
  providers: [MomoConfigService],
  exports: [MomoConfigService]
})
export class MomoConfigModule { }
