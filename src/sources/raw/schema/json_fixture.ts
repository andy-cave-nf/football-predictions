import { z } from 'zod';

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
export const StubJsonSchema = z.object({
  games: z.array(
    z.object({
      home: z.string(),
      away: z.string(),
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
      home: 'Arsenal',
      away: 'Coventry',
      odds: { home: 1.2, draw: 2.1, away: 3.0 },
    },
  ],
};
