import type { CreateVoyageEntryInput, VoyageEntry } from "./demo-voyage.schema.js";

const voyageEntries: VoyageEntry[] = [
  {
    id: "voyage-001",
    visitorName: "Asha",
    role: "navigator",
    message: "Plotting the route from landing scene to project islands.",
    status: "reviewed",
    createdAt: new Date("2026-06-01T10:00:00.000Z").toISOString()
  }
];

export function listVoyageEntries() {
  return voyageEntries;
}

export function createVoyageEntry(input: CreateVoyageEntryInput) {
  const entry: VoyageEntry = {
    id: `voyage-${String(voyageEntries.length + 1).padStart(3, "0")}`,
    ...input,
    status: "queued",
    createdAt: new Date().toISOString()
  };

  voyageEntries.unshift(entry);

  return entry;
}
