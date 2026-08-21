import { JsonSource } from '../../../src/sources/sources';
import type { SourceMatch } from '../../../src/sources/types';
import { ZodError } from 'zod';

describe('Given a json fixture source', () => {
  let source: JsonSource;
  let matches: SourceMatch[];
  beforeEach(() => {
    source = new JsonSource('./fixtures/matches.fixture.json');
  });
  describe('when matchesFor is called with a date that has fixtures', () => {
    beforeEach(async () => {
      matches = await source.matchesFor('2000-01-01');
    });
    it('returns the fixtures played on that date', () => {
      expect(matches).toStrictEqual([
        {
          home: 'Testby United',
          away: 'Fakeham Rovers',
          odds: { home: 1.1, away: 4.0, draw: 1.5 },
        },
        {
          home: 'Mockingham City',
          away: 'Stubbington Town',
          odds: { home: 1.5, away: 1.5, draw: 3.0 },
        },
      ]);
    });
  });
  describe('when matchesFor is called on an empty date', () => {
    beforeEach(async () => {
      matches = await source.matchesFor('2000-01-04');
    });
    it('returns an empty array', () => {
      expect(matches).toHaveLength(0);
    });
  });
  describe('when matchesFor is called on a date missing from source', () => {
    beforeEach(async () => {
      matches = await source.matchesFor('2000-01-10');
    });
    it('returns an empty array', () => {
      expect(matches).toHaveLength(0);
    });
  });
  describe('when matchesFor is called on a date with malformed matches', () => {
    it('a ZodError is raised', async () => {
      await expect(source.matchesFor('2000-01-05')).rejects.toThrow(ZodError);
    });
  });
});

describe('Given a source that does not parse as Json', () => {
  let source: JsonSource;
  beforeEach(() => {
    source = new JsonSource('./fixtures/not-a-json.json');
  });
  describe('when matchesFor is called', () => {
    it('raises a Syntax error', async () => {
      await expect(source.matchesFor('2000-01-01')).rejects.toThrow(SyntaxError);
    });
  });
});
describe('Given a non-existant source', () => {
  let source: JsonSource;
  beforeEach(() => {
    source = new JsonSource('./fixtures/not-a-file.json');
  });
  describe('when matchesFor is called', () => {
    it('raises an error', async () => {
      await expect(source.matchesFor('2000-01-01')).rejects.toThrow();
    });
  });
});
