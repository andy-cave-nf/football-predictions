import type { Prediction, Probability } from './types';
import type { SourceMatch } from '../../sources/types';

export class ConstantProbability implements Probability {
  forMatch(_match: SourceMatch): Prediction {
    return {
      home: 0.2,
      away: 0.2,
      draw: 0.6,
    };
  }
}
