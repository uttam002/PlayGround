import { z } from "zod";

export const createVoyageEntrySchema = z.object({
  visitorName: z.string().trim().min(2).max(40),
  role: z.enum(["captain", "navigator", "shipwright", "cartographer"]),
  message: z.string().trim().min(10).max(240)
});

export type CreateVoyageEntryInput = z.infer<typeof createVoyageEntrySchema>;

export type VoyageEntry = CreateVoyageEntryInput & {
  id: string;
  status: "queued" | "reviewed";
  createdAt: string;
};
