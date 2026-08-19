import type { Strategy } from './types';
import type { SourceMatch } from '../sources/types';
import type { MatchBetType } from '../bets/types';
import type { Probability } from './probabilities/types';

export class ConstantStrategy implements Strategy {
  bet(match: SourceMatch): MatchBetType {
    return {
      teams: match,
      stake: { home: 0, away: 0, draw: 0 },
      probability: { home: 0.3, away: 0.3, draw: 0.4 },
      odds: { home: 3.0, away: 3.0, draw: 3.0 },
    };
  }
}

export class BetStrategy implements Strategy {
  constructor(private probability: Probability) {}
  bet(match: SourceMatch): MatchBetType {
    const prediction = this.probability.forMatch(match);
    return {
      teams: match,
      stake: { home: 0, away: 0, draw: 0 },
      probability: prediction,
      odds: { home: 3.0, away: 3.0, draw: 3.0 },
    };
  }
}
