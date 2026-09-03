import type { OutcomeDistribution } from '../../shared';

export type ProbabilityCalculation<T> = (home: T, away: T) => OutcomeDistribution;
