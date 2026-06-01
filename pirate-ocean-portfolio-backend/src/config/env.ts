import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().optional().default(""),
  AUTH_SECRET: z.string().optional().default(""),
  RESEND_API_KEY: z.string().optional().default(""),
  CORS_ORIGIN: z.string().default("http://localhost:3000")
});

export const env = envSchema.parse(process.env);
