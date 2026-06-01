import cors from "cors";
import express from "express";
import { apiRouter } from "./routes/index.js";
import { env } from "./config/env.js";

export function createServer() {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.use("/api", apiRouter);

  return app;
}
