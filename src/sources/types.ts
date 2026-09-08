export type Team = {
  id: string;
  name: string;
};
export type RawMatch = {
  matchId: string | null;
  kickoff: string | null;
  home: { id: string | null; name: string | null };
  away: { id: string | null; name: string | null };
  odds: { home: number | null; away: number | null; draw: number | null } | null;
  source: string;
};

export type SourceMatch = {
  matchId: string;
  kickoff: string;
  home: Team;
  away: Team;
  odds: { home: number; away: number; draw: number };
  source: string;
};

export interface Source {
  matchesFor(date: string): Promise<SourceMatch[]>;
}

export class SourceError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'SourceError';
  }
}
