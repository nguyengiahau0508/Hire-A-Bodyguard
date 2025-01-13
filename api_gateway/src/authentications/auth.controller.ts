
import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthProviders } from "src/common/enums/authentication/auth.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/authentication/role.enum";
import { ApiOAuth2 } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOAuth2([])
  @Get(`${AuthProviders.Google}`)
  @UseGuards(AuthGuard(AuthProviders.Google))
  async authenticateWithGoogle() {
    // This endpoint redirects to Google's OAuth flow
  }

  @Get(`${AuthProviders.Google}/callback`)
  @UseGuards(AuthGuard(AuthProviders.Google))
  async googleCallback(@Req() req: Request) {
    return await this.authService.handleOAuthLogin(req, AuthProviders.Google);
  }

  @Get(`${AuthProviders.Github}`)
  @UseGuards(AuthGuard(AuthProviders.Github))
  async authenticateWithGithub() {
    // This endpoint redirects to GitHub's OAuth flow
  }

  @Get(`${AuthProviders.Github}/callback`)
  @UseGuards(AuthGuard(AuthProviders.Github))
  async githubCallback(@Req() req: Request) {
    return this.authService.handleOAuthLogin(req, AuthProviders.Github);
  }

  @Post(`${AuthProviders.Local}/login`)
  @UseGuards(AuthGuard(AuthProviders.Local))
  async login(@Req() req: any) {
    return this.authService.generateLoginResponse(req.user);
  }

  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Post(`${AuthProviders.Local}/logout`)
  async logout(@Req() req: any) {
    return this.authService.logout(req);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token)
  }

  // controller for test
  @UseGuards(AuthGuard(AuthProviders.Jwt))
  @Roles(Role.Customer)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}

