import type { OutcomeDistribution } from '../../shared';

export type ProbabilityCalculation<T> = (home: T, away: T) => OutcomeDistribution;

export const EloCalculation: ProbabilityCalculation<number> = (
  home: number,
  away: number
): OutcomeDistribution => {
  const kappa = 1.5;
  const s = 400;
  const d = home - away;

  const homeTerm = Math.pow(10, d / s);
  const awayTerm = Math.pow(10, -d / s);
  const denom = homeTerm + awayTerm + kappa;

  return {
    home: homeTerm / denom,
    draw: kappa / denom,
    away: awayTerm / denom,
  };
};
