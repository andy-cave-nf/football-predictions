import type { Strategy } from './types';
import type { SourceMatch } from '../sources/types';
import type { MatchBetType } from '../bets/types';
import type { Probability } from './probabilities/types';
import type { Stake } from './stake/types';

export class BetStrategy implements Strategy {
  constructor(
    private probability: Probability,
    private stake: Stake
  ) {}
  bet(match: SourceMatch): MatchBetType {
    const prediction = this.probability.forMatch(match);
    const wager = this.stake.stake(prediction, match.odds);
    return {
      teams: { home: match.home, away: match.away },
      stake: wager,
      probability: prediction,
      odds: match.odds,
    };
  }
}
