import type { MatchSource } from '../../shared';

export interface Ratings<T> {
  ratingFor(id: string, source: MatchSource): T;
}

export interface TeamMapping {
  mappedId(id: string, source: MatchSource): string;
}
export interface RatingsSource<T> {
  ratingFor(id: string): T;
}
export class MappedRatings<T> implements Ratings<T> {
  constructor(
    private mapping: TeamMapping,
    private source: RatingsSource<T>
  ) {}
  ratingFor(id: string, source: MatchSource): T {
    return this.source.ratingFor(this.mapping.mappedId(id, source));
  }
}
