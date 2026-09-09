import type { MatchSource } from '../../shared';
import type { Ratings, RatingsSource, TeamMapping } from './types';

export class MappedRatings<T> implements Ratings<T> {
  constructor(
    private mapping: TeamMapping,
    private source: RatingsSource<T>
  ) {}
  async ratingFor(id: string, source: MatchSource): Promise<T> {
    return await this.source.ratingFor(await this.mapping.mappedId(id, source));
  }
}
