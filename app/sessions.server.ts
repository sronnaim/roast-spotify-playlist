import crypto from "crypto";
import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

export const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "app-session",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [crypto.getRandomValues(new Uint32Array(10)).toString()],
    secure: true,
  },
});

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "app-mode",
    secure: true,
    sameSite: "lax",
    secrets: ["mode"],
    path: "/",
    httpOnly: true,
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);
