import type { SourceMatch } from '../../sources/types';

export type Prediction = {
  home: number;
  away: number;
  draw: number;
};

export interface Probability {
  forMatch(match: SourceMatch): Prediction;
}
