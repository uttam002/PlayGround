import { Router } from "express";
import { getVoyageEntries, postVoyageEntry } from "./demo-voyage.controller.js";

export const demoVoyageRouter = Router();

demoVoyageRouter.get("/entries", getVoyageEntries);
demoVoyageRouter.post("/entries", postVoyageEntry);
