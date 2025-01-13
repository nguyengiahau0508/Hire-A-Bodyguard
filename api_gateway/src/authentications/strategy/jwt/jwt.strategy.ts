
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';
import { IJwtPayload } from './interface';
import { AuthProviders } from 'src/common/enums/authentication/auth.enum';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/authentication/role.enum';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

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
    console.log(payload)

    const tokenInfo = await this.tokensService.findTokenByKey(payload.tokenKey)
    if (tokenInfo.isRevoked == true || tokenInfo.type == 'REFRESH_TOKEN' || !tokenInfo) {
      throw new UnauthorizedException('Token Invalid');
    }
    return payload;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

