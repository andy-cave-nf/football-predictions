import { z } from 'zod';

export type SourceMatch = {
  home: string;
  away: string;
};

const JsonMatchSchema = z.object({
  home: z.string(),
  away: z.string(),
  kickoff: z.iso.datetime(),
});

export const JsonSourceSchema = z.array(JsonMatchSchema);
export type JsonSourceType = z.infer<typeof JsonSourceSchema>;

export interface Source {
  matchesFor(date: string): SourceMatch[];
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
