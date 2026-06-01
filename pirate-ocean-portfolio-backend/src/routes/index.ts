import { Router } from "express";
import { demoVoyageRouter } from "../features/demo-voyage/demo-voyage.routes.js";

export const apiRouter = Router();

apiRouter.get("/", (_request, response) => {
  response.json({ service: "pirate-ocean-portfolio-backend", ok: true });
});

apiRouter.use("/demo-voyage", demoVoyageRouter);
