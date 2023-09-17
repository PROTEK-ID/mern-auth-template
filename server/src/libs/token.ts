import { JwtPayload, VerifyCallback, sign, verify } from "jsonwebtoken";
import env from "../config/env";

export function generateAccessToken({ ...props }) {
  return sign({ ...props }, env?.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30s",
  });
}

export function generateRefreshToken({ ...props }) {
  return sign({ ...props }, env?.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyToken(
  token: string,
  callback?: VerifyCallback<string | JwtPayload>
) {
  verify(token, env?.REFRESH_TOKEN_SECRET!, callback);
}
