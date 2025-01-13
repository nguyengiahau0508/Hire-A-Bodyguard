export interface IJwtPayload {
  sub: number;
  email: string;
  roles?: string[];
  tokenKey: string;
  accessKey?: string;
  refreshKey?: string;
  [key: string]: any;
}
