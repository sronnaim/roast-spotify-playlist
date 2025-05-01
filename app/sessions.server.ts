import crypto from "crypto";
import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 5,
      path: "/",
      sameSite: "lax",
      secrets: [crypto.getRandomValues(new Uint32Array(10)).toString()],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
