import { HARDCODED_BET, SimpleBet } from '../src/match_bets';
import type { MatchBet, MatchBets } from '../src/types';

export type SetUp = {
  bet: MatchBets;
  rows: MatchBet[];
};

export function simpleBetWithOutput(): SetUp {
  const bet = new SimpleBet();
  return { bet, rows: [HARDCODED_BET] };
}
