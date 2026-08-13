export type MatchBet = {
  teams: { home: string; away: string };
  stake: { home: number; away: number; draw: number };
  probability: { home: number; away: number; draw: number };
  odds: { home: number; away: number; draw: number };
};

export interface MatchBets {
  bet(date: string, filepath: string): void;
}
