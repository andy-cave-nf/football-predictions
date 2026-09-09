import type { Probability, Ratings } from './types';
import type { SourceMatch } from '../../sources/types';
import type { OutcomeDistribution } from '../../shared';
import type { ProbabilityCalculation } from './calculations';

export class ConstantProbability implements Probability {
  async forMatch(_match: SourceMatch): Promise<OutcomeDistribution> {
    return {
      home: 0.2,
      away: 0.2,
      draw: 0.6,
    };
  }
}

export class RatedProbability<T> implements Probability {
  constructor(
    private ratings: Ratings<T>,
    private calculation: ProbabilityCalculation<T>
  ) {}
  async forMatch(match: SourceMatch): Promise<OutcomeDistribution> {
    return this.calculation(
      await this.ratings.ratingFor(match.home.id, match.source),
      await this.ratings.ratingFor(match.away.id, match.source)
    );
  }
}
