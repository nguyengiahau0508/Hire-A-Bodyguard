import { Module } from "@nestjs/common";
import { GoogleOauth2Service } from "./google-oauth2.service";

@Module({
  providers: [GoogleOauth2Service],
  exports: [GoogleOauth2Service]
})
export class GoogleAuthOauth2Module { }
