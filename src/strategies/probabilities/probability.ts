import type { Probability } from './types';
import type { SourceMatch } from '../../sources/types';
import type { OutcomeDistribution } from '../../shared';

export class ConstantProbability implements Probability {
  forMatch(_match: SourceMatch): OutcomeDistribution {
    return {
      home: 0.2,
      away: 0.2,
      draw: 0.6,
    };
  }
}
