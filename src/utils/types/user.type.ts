export type User = {
  id: number;
  email: string;
  token: string;
  isAuthenticated: boolean;
  hasActiveNotifications: boolean;
};

export interface DecodedJwt {
  readonly sub: number;
  readonly iat: number;
  readonly exp: number;
  readonly username: string;
  readonly hasActiveNotifications: boolean;
}
