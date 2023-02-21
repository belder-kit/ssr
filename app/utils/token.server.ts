import { createCookie } from "@remix-run/node";
import crypto from "node:crypto";

export const tokenCookie = createCookie("token", {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax",
  secrets: [],
});

async function getToken(cookie: string | null) {
  const token = await tokenCookie.parse(cookie);

  if (typeof token !== "string") {
    return null;
  }

  return token;
}

async function commitToken(token: string) {
  return tokenCookie.serialize(token);
}

async function destroyToken() {
  return tokenCookie.serialize(null, {
    expires: new Date(0),
  });
}

export function generateToken() {
  return crypto.randomBytes(64).toString("base64url");
}

export { getToken, commitToken, destroyToken };
