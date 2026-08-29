export type RawMatch = {
  home: string | null;
  away: string | null;
  odds: { home: number | null; away: number | null; draw: number | null } | null;
};

export type SourceMatch = {
  home: string;
  away: string;
  odds: { home: number; away: number; draw: number };
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
