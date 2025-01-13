
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthConfigurationService } from "src/configurations/authentications/jwt/configuration.service";
import { TokensService } from "src/modules/mariadb/tokens/tokens.service";
import { User } from "src/modules/mariadb/users/entities/user.entity";
import { UsersService } from "src/modules/mariadb/users/users.service";
import * as bcrypt from "bcrypt";
import { generateUniqueKey } from "src/common/utils/unique-key-generator";
import { calculateExpiresAt } from "src/common/utils/time-utils";
import { IJwtPayload } from "./strategy/jwt/interface";
import { AuthProvidersService } from "src/modules/mariadb/auth_providers/auth-providers.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly authProviderService: AuthProvidersService,
    private readonly tokensService: TokensService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthConfigurationService: JwtAuthConfigurationService,
  ) { }

  async handleOAuthLogin(req: any, provider: string) {
    if (!req.user) return null;

    const { providerId, email, fullName, picture } = req.user;
    let authProviderOfUser = await this.authProviderService.findByProviderId(providerId);

    const userPayload = {
      email,
      name: fullName,
      picture,
      authProvider: { provider, providerId },
    };

    const currentUser = authProviderOfUser
      ? await this.userService.update(authProviderOfUser.user.id, {
        email,
        name: fullName || authProviderOfUser.user.name,
        picture,
      })
      : await this.userService.create(userPayload);

    const user = await this.userService.findById(currentUser.id);
    return this.generateLoginResponse(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const currentUser = await this.userService.findLocalAuthUserByEmail(email);
    if (!currentUser) return null;

    const isMatch = await bcrypt.compare(password, currentUser.authProvider.passwordHash);
    if (!isMatch) return null;

    return this.userService.findById(currentUser.id);
  }

  private generateToken(payload: IJwtPayload, expiresIn: string) {
    return this.jwtService.sign(payload, { expiresIn });
  }

  private async saveToken(
    key: string,
    type: "ACCESS_TOKEN" | "REFRESH_TOKEN",
    user: User,
    expiresIn: string,
  ) {
    await this.tokensService.save({
      key,
      type,
      expiresAt: calculateExpiresAt(expiresIn),
      user,
    });
  }

  async generateLoginResponse(user: User) {
    const accessKey = generateUniqueKey();
    const refreshKey = generateUniqueKey();

    const basePayload = {
      sub: user.id,
      email: user.email,
    };

    const accessPayload = { ...basePayload, accessKey, refreshKey, tokenKey: accessKey };
    const refreshPayload = { ...basePayload, accessKey, refreshKey, tokenKey: refreshKey };

    const accessExpiresIn = this.jwtAuthConfigurationService.accessExpiresIn;
    const refreshExpiresIn = this.jwtAuthConfigurationService.refreshExpiresIn;

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(accessPayload, accessExpiresIn),
      this.generateToken(refreshPayload, refreshExpiresIn),
    ]);

    await Promise.all([
      this.saveToken(accessKey, "ACCESS_TOKEN", user, accessExpiresIn),
      this.saveToken(refreshKey, "REFRESH_TOKEN", user, refreshExpiresIn),
    ]);

    return { accessToken, refreshToken };
  }

  async logout(req: any) {
    const payload: IJwtPayload = req.user;
    if (!payload || !payload.accessKey || !payload.refreshKey) {
      throw new UnauthorizedException("Invalid token payload.");
    }

    const [accessTokenRecord, refreshTokenRecord] = await Promise.all([
      this.tokensService.findTokenByKey(payload.accessKey),
      this.tokensService.findTokenByKey(payload.refreshKey),
    ]);

    if (!accessTokenRecord || !refreshTokenRecord) {
      throw new UnauthorizedException("Token does not exist or has already been revoked.");
    }

    await Promise.all([
      this.tokensService.revokeToken(payload.accessKey),
      this.tokensService.revokeToken(payload.refreshKey),
    ]);

    return { message: "Tokens successfully revoked." };
  }


  async refreshToken(token: string) {
    try {
      // Verify and decode the provided refresh token
      const decoded: IJwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtAuthConfigurationService.secret, // Use the secret specific to refresh tokens
      });

      // Check if the refresh token exists in the database and is not revoked
      const refreshToken = await this.tokensService.findTokenByKey(decoded.refreshKey);
      if (!refreshToken || refreshToken.isRevoked) {
        throw new UnauthorizedException("Invalid or revoked refresh token."); // Handle invalid or revoked tokens
      }

      // Revoke the old access and refresh tokens in the database
      await Promise.all([
        this.tokensService.revokeToken(decoded.accessKey), // Revoke the associated access token
        this.tokensService.revokeToken(decoded.refreshKey), // Revoke the current refresh token
      ]);

      // Retrieve the user associated with the token
      const user = await this.userService.findById(decoded.sub);
      if (!user) {
        throw new UnauthorizedException("User not found."); // Handle cases where the user does not exist
      }

      // Generate and return a new pair of access and refresh tokens
      return this.generateLoginResponse(user);
    } catch (error) {
      // Handle errors during token verification or other operations
      throw new UnauthorizedException("Unable to refresh token.", error.message);
    }
  }

}
