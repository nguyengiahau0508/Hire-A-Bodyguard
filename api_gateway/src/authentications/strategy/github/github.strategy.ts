
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { GithubAuthConfigurationService } from "src/configurations/authentications/github/configuration.service";

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, AuthProviders.Github) {
  constructor(private readonly githubAuthConfig: GithubAuthConfigurationService) {
    super({
      clientID: githubAuthConfig.clientId,
      clientSecret: githubAuthConfig.clientSecret,
      callbackURL: 'http://localhost:8080/auth/github/callback',
      scope: ['user:email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = {
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      picture: profile.photos?.[0]?.value || null,
      fullName: profile.displayName || profile._json.name || null,
      accessToken,
      refreshToken
    };
    done(null, user);
  }
}

