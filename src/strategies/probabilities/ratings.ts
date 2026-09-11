import type { MatchSource } from '../../shared';
import type { Ratings, RatingsSource, TeamMapping } from './types';
import { readFile } from 'node:fs/promises';

export class MappedRatings<T> implements Ratings<T> {
  constructor(
    private mapping: TeamMapping,
    private source: RatingsSource<T>
  ) {}
  async ratingFor(id: string, source: MatchSource): Promise<T> {
    return await this.source.ratingFor(await this.mapping.mappedId(id, source));
  }
}

export class FixedEloRatings implements RatingsSource<number> {
  constructor(private filepath: string) {}
  async ratingFor(id: string): Promise<number> {
    const ratings: Record<string, number> = JSON.parse(await readFile(this.filepath, 'utf8'));
    const rating = ratings[id];
    if (rating === undefined) {
      throw new Error('Missed Rating!');
    }
    return rating;
  }
}

export class FixedEloMappedRatings implements TeamMapping {
  constructor(private filepath: string) {}
  async mappedId(id: string, source: MatchSource): Promise<string> {
    const mappings: Record<string, Record<string, string>> = JSON.parse(
      await readFile(this.filepath, 'utf8')
    );
    const map = mappings[source];
    if (map === undefined) {
      throw new Error('Missed Rating!');
    }
    const name = map[id];
    if (name === undefined) {
      throw new Error('Missed Rating!');
    }
    return name;
  }
}
