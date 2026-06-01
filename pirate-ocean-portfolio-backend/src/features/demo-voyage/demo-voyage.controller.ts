import type { Request, Response } from "express";
import { ZodError } from "zod";
import { createVoyageEntry, listVoyageEntries } from "./demo-voyage.service.js";
import { createVoyageEntrySchema } from "./demo-voyage.schema.js";

export function getVoyageEntries(_request: Request, response: Response) {
  response.json({
    data: listVoyageEntries(),
    meta: {
      module: "demo-voyage",
      source: "in-memory"
    }
  });
}

export function postVoyageEntry(request: Request, response: Response) {
  try {
    const input = createVoyageEntrySchema.parse(request.body);
    const entry = createVoyageEntry(input);

    response.status(201).json({ data: entry });
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({
        error: "VALIDATION_ERROR",
        issues: error.issues
      });
      return;
    }

    response.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
}
