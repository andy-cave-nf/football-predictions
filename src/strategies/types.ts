import type { SourceMatch } from '../sources/types';
import type { MatchBetType } from '../bets/types';

export interface Strategy {
  bet(match: SourceMatch): MatchBetType;
}
