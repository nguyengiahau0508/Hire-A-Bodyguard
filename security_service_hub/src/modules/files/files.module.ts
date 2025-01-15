import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { FilesServcie } from "./files.service";
import { FileRepository } from "./file.repository";
import { GoogleDriveModule } from "src/integrations/google-drive/google-drive.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    GoogleDriveModule
  ],
  exports: [FilesServcie],
  providers: [FilesServcie, FileRepository]
})
export class FilesModule { }
