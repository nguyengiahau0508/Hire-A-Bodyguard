import { Injectable } from "@nestjs/common";
import { FileRepository } from "./file.repository";
import { File } from "./entities/file.entity";
import { BaseService } from "src/commons/shared/base.service";
import { GoogleDriveService } from "src/integrations/google-drive/google-drive.service";
import { FileProvider } from "src/commons/enums/file.enum";

@Injectable()
export class FilesServcie extends BaseService<File> {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly googleDriveService: GoogleDriveService
  ) { super(fileRepository) }

  async uploadFileToDrive(file: Express.Multer.File) {
    const fileId = await this.googleDriveService.uploadFile(file)
    const created = this.fileRepository.create({
      provider: FileProvider.GOOGLE_DRIVE,
      providerId: fileId,
      url: `https://drive.google.com/uc?id=${fileId}`
    })

    return await this.fileRepository.save(created)
  }
}
