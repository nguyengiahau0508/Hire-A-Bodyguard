import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthProvidersModule } from "./auth_providers/auth-providers.module";
import { SessionsModule } from "./sessions/sessions.module";
import { TokensModule } from "./tokens/tokens.module";

@Module({
  imports: [
    UsersModule,
    AuthProvidersModule,
    SessionsModule,
    TokensModule
  
  ]
})

export class MariadbFeatureModule { }
