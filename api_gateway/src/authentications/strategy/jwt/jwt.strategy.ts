
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';
import { IJwtPayload } from './interface';
import { AuthProviders } from 'src/common/enums/authentication/auth.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthProviders.Jwt) {
  constructor(
    private reflector: Reflector,
    private readonly tokensService: TokensService,
    jwtAuthConfigurationService: JwtAuthConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAuthConfigurationService.secret,
      //passReqToCallback: true,
    });
  }

  async validate(payload: IJwtPayload) {
    const tokenInfo = await this.tokensService.findTokenByKey(payload.tokenKey)
    if (tokenInfo.isRevoked == true || tokenInfo.type == 'REFRESH_TOKEN' || !tokenInfo) {
      throw new UnauthorizedException('Token Invalid');
    }
    return payload;
  }
}

