import type { Source, SourceMatch } from '../../../src/sources/types';
import { RawStub, stubExtract } from '../../../src/sources/raw';
import { ApiSource } from '../../../src/sources/sources';

describe('Given a Premier League source for 2026-08-21', () => {
  let source: Source;
  beforeEach(() => {
    source = new ApiSource(new RawStub(), stubExtract);
  });
  describe('when the fixtures are requested', () => {
    let matches: SourceMatch[];
    beforeEach(async () => {
      matches = await source.matchesFor('2026-08-21');
    });
    it('returns the Arsenal vs Coventry match', () => {
      expect(matches).toStrictEqual([
        {
          home: 'Arsenal',
          away: 'Coventry',
          odds: {
            home: 1.2,
            away: 6,
            draw: 4,
          },
        },
      ]);
    });
  });
});
