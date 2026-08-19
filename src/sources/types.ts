import { z } from 'zod';

export type SourceMatch = {
  home: string;
  away: string;
  odds: { home: number; away: number; draw: number };
};

const JsonMatchSchema = z.object({
  home: z.string(),
  away: z.string(),
  kickoff: z.iso.datetime(),
  odds: z.object({
    home: z.number().min(1),
    away: z.number().min(1),
    draw: z.number().min(1),
  }),
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
