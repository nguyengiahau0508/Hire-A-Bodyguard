import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthConfigurationModule } from "src/configurations/authentications/jwt/configuration.module";
import { JwtAuthConfigurationService } from "src/configurations/authentications/jwt/configuration.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [JwtAuthConfigurationModule],
      inject: [JwtAuthConfigurationService],
      useFactory: async (jwtAuthConfigurationService: JwtAuthConfigurationService) => {
        return {
          secret: jwtAuthConfigurationService.secret,
          signOptions: { expiresIn: jwtAuthConfigurationService.accessExpiresIn }
        }
      },
    })
  ],
  exports: [JwtModule]
})
export class JwtAuthProviderModule { }
