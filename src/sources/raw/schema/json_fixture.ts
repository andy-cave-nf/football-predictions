import { z } from 'zod';

const JsonMatchSchema = z.object({
  matchId: z.string(),
  home: z.object({ id: z.string(), name: z.string() }),
  away: z.object({ id: z.string(), name: z.string() }),
  kickoff: z.iso.datetime(),
  odds: z.object({
    home: z.number().min(1),
    away: z.number().min(1),
    draw: z.number().min(1),
  }),
});
export const JsonSourceSchema = z.array(JsonMatchSchema);
export type JsonSourceType = z.infer<typeof JsonSourceSchema>;
export const StubJsonSchema = z.object({
  games: z.array(
    z.object({
      matchId: z.string(),
      kickoff: z.iso.datetime(),
      home: z.object({ id: z.string(), name: z.string() }),
      away: z.object({ id: z.string(), name: z.string() }),
      odds: z.object({
        home: z.number().min(1),
        away: z.number().min(1),
        draw: z.number().min(1),
      }),
    })
  ),
});
export type StubJson = z.infer<typeof StubJsonSchema>;
export const HARDCODED_RAWJSON: StubJson = {
  games: [
    {
      matchId: '1',
      kickoff: '2000-01-03T15:00:00Z',
      home: { id: '1', name: 'Arsenal' },
      away: { id: '2', name: 'Coventry' },
      odds: { home: 1.2, draw: 2.1, away: 3.0 },
    },
  ],
};
