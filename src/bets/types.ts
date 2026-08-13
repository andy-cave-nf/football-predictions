import * as z from 'zod';

const Teams = z.object({
  home: z.string(),
  away: z.string(),
});

const Stakes = z
  .object({
    home: z.number().min(0).max(1),
    away: z.number().min(0).max(1),
    draw: z.number().min(0).max(1),
  })
  .refine((s) => s.home + s.away + s.draw <= 1);

const Probabilities = z
  .object({
    home: z.number().min(0).max(1),
    away: z.number().min(0).max(1),
    draw: z.number().min(0).max(1),
  })
  .refine((s) => Math.abs(s.home + s.away + s.draw - 1) <= 0.0005);

const Odds = z.object({
  home: z.number().min(1),
  away: z.number().min(1),
  draw: z.number().min(1),
});

const MatchBetSchema = z
  .object({
    teams: Teams.strict(),
    stake: Stakes.strict(),
    probability: Probabilities.strict(),
    odds: Odds.strict(),
  })
  .strict();

export const MatchBetRows = z.array(MatchBetSchema);

export type MatchBetType = z.infer<typeof MatchBetSchema>;

export interface MatchBets {
  bet(date: string, filepath: string): void;
}
