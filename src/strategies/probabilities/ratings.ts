import type { MatchSource } from '../../shared';

export interface Ratings<T> {
  ratingFor(id: string, source: MatchSource): T;
}
