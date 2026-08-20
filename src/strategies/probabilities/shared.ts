import type { Probability } from './types';
import type { PredictionRule } from './rules/rules';
import type { SourceMatch } from '../../sources/types';
import type { OutcomeDistribution } from '../../shared';

export class RuleValidatedProbability implements Probability {
  constructor(
    private origin: Probability,
    private rules: PredictionRule[]
  ) {}
  forMatch(match: SourceMatch): OutcomeDistribution {
    const prediction = this.origin.forMatch(match);
    try {
      this.rules.forEach((rule) => {
        rule(prediction);
      });
      return prediction;
    } catch (error) {
      throw new ProbabilityError('Probability failed', { cause: error });
    }
  }
}

export class ProbabilityError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'ProbabilityError';
  }
}
