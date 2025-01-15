
import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import { GoogleOauth2Service } from '../google-oauth2/google-oauth2.service';
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private driveClient: drive_v3.Drive;

  constructor(private readonly googleOauth2Service: GoogleOauth2Service) {
    const auth = this.googleOauth2Service.getAuthenticatedClient(); // Lấy client đã được xác thực
    this.driveClient = google.drive({ version: 'v3', auth });
  }


  private bufferToStream(buffer: any): Readable {
    // Chuyển đổi thành Buffer thực sự nếu chưa phải
    const realBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer.data);
    const stream = new Readable();
    stream.push(realBuffer);
    stream.push(null); // Kết thúc stream
    return stream;
  }

  /**
   * Upload file lên Google Drive
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileStream = this.bufferToStream(file.buffer);

    try {
      const response = await this.driveClient.files.create({
        requestBody: {
          name: file.originalname,
          parents: ['1mLMlYnef1MnEA3sizXHAVCP4an_JsMag'], // Thay bằng folder ID thực tế
        },
        media: {
          mimeType: file.mimetype,
          body: fileStream, // Sử dụng stream thay vì buffer
        },
        fields: 'id',
      });

      return response.data.id;
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw new Error('Could not upload file to Google Drive');
    }
  }


  /**
   * Xóa file trên Google Drive
   * @param fileId ID của file cần xóa
   * @returns Thông báo thành công hoặc lỗi
   */
  async deleteFile(fileId: string): Promise<void> {
    await this.driveClient.files.delete({ fileId });
  }

  /**
   * Lấy danh sách file trên Google Drive
   * @returns Danh sách file
   */
  async listFiles(): Promise<drive_v3.Schema$File[]> {
    const response = await this.driveClient.files.list({
      pageSize: 10,
      fields: 'files(id, name)',
    });

    return response.data.files || [];
  }
}
