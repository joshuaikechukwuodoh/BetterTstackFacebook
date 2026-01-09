import { db } from "@Backend/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@Backend/db/schema/auth";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
        enum: ["user", "admin", "tester"],
      },
    },
  },
});

// import { db } from @backend/db;
// import * as schema from "@backend/db/schema/auth";
// import { env } from "@backend/env/server";
// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";

// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: "pg",

//     schema: schema,
//   }),
//   trustedOrigins: [env.CORS_ORIGIN],
//   emailAndPassword: {
//     enabled: true,
//   },
//   advanced: {
//     defaultCookieAttributes: {
//       sameSite: "none",
//       secure: true,
//       httpOnly: true,
//     },
//   },
//   plugins: [],
