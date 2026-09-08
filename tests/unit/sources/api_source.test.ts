import type { Source, SourceMatch } from '../../../src/sources/types';
import { ApiSource } from '../../../src/sources/sources';
import { stubExtract } from '../../../src/sources/raw/extract';
import { RawStub } from '../../../src/sources/raw/raw';
import { StubJsonSchema } from '../../../src/sources/raw/schema/json_fixture';
import { NullLog } from '../../../src/logs';

describe('Given a Premier League source for 2026-08-21', () => {
  let source: Source;
  beforeEach(() => {
    source = new ApiSource(new RawStub(), stubExtract, StubJsonSchema, new NullLog());
  });
  describe('when the fixtures are requested', () => {
    let matches: SourceMatch[];
    beforeEach(async () => {
      matches = await source.matchesFor('2026-08-21');
    });
    it('returns the Arsenal vs Coventry match', () => {
      expect(matches).toStrictEqual([
        {
          matchId: '1',
          kickoff: '2000-01-03T15:00:00Z',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Coventry' },
          odds: {
            home: 1.2,
            away: 6,
            draw: 4,
          },
          source: 'stub',
        },
      ]);
    });
  });
});
