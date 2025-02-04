
export enum FileMimeType {
  PDF = 'application/pdf',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  MP4 = 'video/mp4',
  TEXT = 'text/plain',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ZIP = 'application/zip',
  OTHER = 'application/octet-stream',
}

export enum FileProvider {
  GOOGLE_DRIVE = 'Google Drive',
  AWS_S3 = 'AWS S3',
  DROPBOX = 'Dropbox',
  LOCAL = 'Local',
}
