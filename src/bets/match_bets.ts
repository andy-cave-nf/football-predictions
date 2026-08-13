import { writeFileSync } from 'node:fs';
import type { MatchBetType, MatchBets } from './types';

export const HARDCODED_BET: MatchBetType = {
  teams: { home: 'Arsenal', away: 'Chelsea' },
  stake: { home: 0.1, away: 0.1, draw: 0.1 },
  probability: { home: 0.3, away: 0.3, draw: 0.4 },
  odds: { home: 1.5, away: 1.5, draw: 1.5 },
};

export class SimpleBet implements MatchBets {
  bet(date: string, filepath: string): void {
    writeFileSync(filepath, JSON.stringify([HARDCODED_BET], null, 2));
  }
}
