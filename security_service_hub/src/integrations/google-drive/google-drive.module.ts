import { Module } from "@nestjs/common";
import { GoogleAuthOauth2Module } from "../google-oauth2/google-oauth2.module";
import { GoogleDriveService } from "./google-drive.service";

@Module({
  imports: [GoogleAuthOauth2Module],
  exports: [GoogleDriveService],
  providers: [GoogleDriveService]
})
export class GoogleDriveModule { }
