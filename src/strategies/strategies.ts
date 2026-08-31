import type { Strategy } from './types';
import type { SourceMatch } from '../sources/types';
import type { MatchBetType } from '../bets/types';
import type { Probability } from './probabilities/types';
import type { Stake } from './stakes/types';
import { type Logs } from '../logs';

export class BetStrategy implements Strategy {
  constructor(
    private probability: Probability,
    private stake: Stake,
    private log: Logs
  ) {}
  bet(match: SourceMatch): MatchBetType {
    const prediction = this.probability.forMatch(match);
    const wager = this.stake.stake(prediction, match.odds);
    this.log.info(
      `${match.home}(${match.odds.home}) vs ${match.away}(${match.odds.away}) draw:${match.odds.draw}`
    );
    this.log.info(`Probability H:${prediction.home} A:${prediction.away}, D:${prediction.draw}`);
    this.log.info(`Wager: H:${wager.home} A:${wager.away}, D:${wager.draw}`);
    return {
      teams: { home: match.home, away: match.away },
      stake: wager,
      probability: prediction,
      odds: match.odds,
    };
  }
}
