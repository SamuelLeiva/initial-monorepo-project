// Esto permite que gateway y user-service compartan exactamente los mismos tipos.

export interface RegisterUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface GetUserMePayload {
  token: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name?: string;
  access_token?: string;
}
