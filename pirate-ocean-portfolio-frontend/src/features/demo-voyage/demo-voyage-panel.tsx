"use client";

import { FormEvent, useEffect, useState } from "react";
import { createVoyageEntry, fetchVoyageEntries } from "./api";
import type { VoyageEntry, VoyageRole } from "./types";

const roles: VoyageRole[] = ["captain", "navigator", "shipwright", "cartographer"];

export function DemoVoyagePanel() {
  const [entries, setEntries] = useState<VoyageEntry[]>([]);
  const [visitorName, setVisitorName] = useState("Mira");
  const [role, setRole] = useState<VoyageRole>("navigator");
  const [message, setMessage] = useState("Testing the route from the frontend harbor to the backend captain's log.");
  const [status, setStatus] = useState<"idle" | "loading" | "submitting" | "error">("loading");

  useEffect(() => {
    fetchVoyageEntries()
      .then((response) => {
        setEntries(response.data);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await createVoyageEntry({ visitorName, role, message });
      setEntries((currentEntries) => [response.data, ...currentEntries]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen bg-[#f7f0df] text-[#162432]">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b4c1d]">
              Demo module
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#10243a] md:text-7xl">
              Voyage control room
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#52616e]">
              A small working example for the real portfolio flow: the frontend sends a
              visitor action, the backend validates it, stores a temporary record, and
              returns updated voyage data.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatusTile label="Backend route" value="/api/demo-voyage" />
            <StatusTile label="Validation" value="Zod schema" />
            <StatusTile label="Storage" value="In-memory demo" />
          </div>
        </div>

        <div className="rounded-lg border border-[#d7c39b] bg-[#fffaf0] p-5 shadow-[0_24px_80px_rgba(22,36,50,0.14)]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-[#24394a]" htmlFor="visitorName">
                Visitor name
              </label>
              <input
                id="visitorName"
                className="mt-2 w-full rounded-md border border-[#d7c39b] bg-white px-3 py-2 text-sm outline-none focus:border-[#8a5a24]"
                value={visitorName}
                onChange={(event) => setVisitorName(event.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#24394a]" htmlFor="role">
                Crew role
              </label>
              <select
                id="role"
                className="mt-2 w-full rounded-md border border-[#d7c39b] bg-white px-3 py-2 text-sm outline-none focus:border-[#8a5a24]"
                value={role}
                onChange={(event) => setRole(event.target.value as VoyageRole)}
              >
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#24394a]" htmlFor="message">
                Voyage note
              </label>
              <textarea
                id="message"
                className="mt-2 min-h-28 w-full rounded-md border border-[#d7c39b] bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-[#8a5a24]"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>

            <button
              className="h-11 w-full rounded-md bg-[#10243a] px-4 text-sm font-semibold text-white transition hover:bg-[#1e3c59] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === "submitting"}
              type="submit"
            >
              {status === "submitting" ? "Sending..." : "Send voyage log"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#10243a]">Latest entries</h2>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#7b4c1d]">
                {status === "loading" ? "Loading" : `${entries.length} logs`}
              </span>
            </div>

            {status === "error" ? (
              <p className="rounded-md border border-[#c7523b] bg-[#fff1ed] px-3 py-2 text-sm text-[#8f2d1b]">
                Backend is not reachable yet. Start it on port 4000 and refresh.
              </p>
            ) : (
              entries.map((entry) => (
                <article key={entry.id} className="rounded-md border border-[#ead8b2] bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-[#10243a]">{entry.visitorName}</p>
                    <span className="rounded bg-[#f2e3bf] px-2 py-1 text-xs font-medium text-[#7b4c1d]">
                      {entry.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#697989]">
                    {entry.role}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#52616e]">{entry.message}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#d7c39b] bg-[#fffaf0] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7b4c1d]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#10243a]">{value}</p>
    </div>
  );
}
