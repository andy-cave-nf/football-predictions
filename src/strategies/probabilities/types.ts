import type { SourceMatch } from '../../sources/types';
import type { OutcomeDistribution } from '../../shared';

export interface Probability {
  forMatch(match: SourceMatch): OutcomeDistribution;
}
