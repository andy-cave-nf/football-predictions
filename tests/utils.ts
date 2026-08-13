import { HARDCODED_BET, SimpleBet } from '../src/bets/match_bets';
import type { MatchBetType, MatchBets } from '../src/bets/types';

export type SetUp = {
  bet: MatchBets;
  rows: MatchBetType[];
};

export function simpleBetWithOutput(): SetUp {
  const bet = new SimpleBet();
  return { bet, rows: [HARDCODED_BET] };
}
