import { MappedRatings } from '../../../../src/strategies/probabilities/ratings';
import { StubRatingsSource, StubTeamMapping } from '../../utils';
import type {
  Ratings,
  RatingsSource,
  TeamMapping,
} from '../../../../src/strategies/probabilities/types';

describe('Given a rating source and a mapping from team ids to rating-source ids', () => {
  let ratings: Ratings<number>;
  let ratingsSource: RatingsSource<number>;
  let mapping: TeamMapping;
  beforeEach(() => {
    ratingsSource = new StubRatingsSource({ Arsenal: 100, Chelsea: 150 });
    mapping = new StubTeamMapping(
      new Map([
        [
          'espn',
          new Map([
            ['1', 'Arsenal'],
            ['2', 'Chelsea'],
          ]),
        ],
      ])
    );
    ratings = new MappedRatings(mapping, ratingsSource);
  });
  describe('when queried with a team id that exists in the mapping', () => {
    let result: number;
    beforeEach(async () => {
      result = await ratings.ratingFor('1', 'espn');
    });
    it('resolves the id and returns the rating from the source', () => {
      expect(result).toEqual(100);
    });
  });
});
