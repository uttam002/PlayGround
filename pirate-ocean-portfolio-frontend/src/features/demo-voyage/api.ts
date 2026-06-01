import type { VoyageEntriesResponse, VoyageEntry, VoyageRole } from "./types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type CreateVoyageEntryPayload = {
  visitorName: string;
  role: VoyageRole;
  message: string;
};

export async function fetchVoyageEntries() {
  const response = await fetch(`${apiBaseUrl}/api/demo-voyage/entries`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Unable to load voyage entries.");
  }

  return response.json() as Promise<VoyageEntriesResponse>;
}

export async function createVoyageEntry(payload: CreateVoyageEntryPayload) {
  const response = await fetch(`${apiBaseUrl}/api/demo-voyage/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Unable to create voyage entry.");
  }

  return response.json() as Promise<{ data: VoyageEntry }>;
}
