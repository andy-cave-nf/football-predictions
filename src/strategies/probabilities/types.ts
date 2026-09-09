import type { SourceMatch } from '../../sources/types';
import type { MatchSource, OutcomeDistribution } from '../../shared';

export interface Probability {
  forMatch(match: SourceMatch): Promise<OutcomeDistribution>;
}

export interface Ratings<T> {
  ratingFor(id: string, source: MatchSource): Promise<T>;
}

export interface TeamMapping {
  mappedId(id: string, source: MatchSource): Promise<string>;
}

export interface RatingsSource<T> {
  ratingFor(id: string): Promise<T>;
}
