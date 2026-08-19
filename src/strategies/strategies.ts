import type { Strategy } from './types';
import type { SourceMatch } from '../sources/types';
import type { MatchBetType } from '../bets/types';
import type { Probability } from './probabilities/types';

export class BetStrategy implements Strategy {
  constructor(private probability: Probability) {}
  bet(match: SourceMatch): MatchBetType {
    return {
      teams: match,
      stake: { home: 0, away: 0, draw: 0 },
      probability: this.probability.forMatch(match),
      odds: { home: 3.0, away: 3.0, draw: 3.0 },
    };
  }
}
