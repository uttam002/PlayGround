export type VoyageRole = "captain" | "navigator" | "shipwright" | "cartographer";

export type VoyageEntry = {
  id: string;
  visitorName: string;
  role: VoyageRole;
  message: string;
  status: "queued" | "reviewed";
  createdAt: string;
};

export type VoyageEntriesResponse = {
  data: VoyageEntry[];
  meta: {
    module: string;
    source: string;
  };
};
