import type { MatchBetRows } from '../bets/types';

export interface Printer {
  print(bets: MatchBetRows): void;
}
