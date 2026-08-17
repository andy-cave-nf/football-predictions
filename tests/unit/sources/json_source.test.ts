import { JsonSource } from '../../../src/sources/json_source';
import type { SourceMatch } from '../../../src/sources/types';
import { ZodError } from 'zod';

describe('Given a json fixture source', () => {
  let source: JsonSource;
  let matches: SourceMatch[];
  beforeEach(() => {
    source = new JsonSource('./fixtures/matches.fixture.json');
  });
  describe('when matchesFor is called with a date that has fixtures', () => {
    beforeEach(() => {
      matches = source.matchesFor('2000-01-01');
    });
    it('returns the fixtures played on that date', () => {
      expect(matches).toStrictEqual([
        { home: 'Testby United', away: 'Fakeham Rovers' },
        { home: 'Mockingham City', away: 'Stubbington Town' },
      ]);
    });
  });
  describe('when matchesFor is called on an empty date', () => {
    beforeEach(() => {
      matches = source.matchesFor('2000-01-04');
    });
    it('returns an empty array', () => {
      expect(matches).toHaveLength(0);
    });
  });
  describe('when matchesFor is called on a date missing from source', () => {
    beforeEach(() => {
      matches = source.matchesFor('2000-01-10');
    });
    it('returns an empty array', () => {
      expect(matches).toHaveLength(0);
    });
  });
  describe('when matchesFor is called on a date with malformed matches', () => {
    it('a ZodError is raised', () => {
      expect(() => source.matchesFor('2000-01-05')).toThrow(ZodError);
    });
  });
});

describe('Given a source that does not parse as Json', () => {
  let source: JsonSource;
  beforeEach(() => {
    source = new JsonSource('./fixtures/not-a-json.json');
  });
  describe('when matchesFor is called', () => {
    it('raises a Syntax error', () => {
      expect(() => source.matchesFor('2000-01-01')).toThrow(SyntaxError);
    });
  });
});
describe('Given a non-existant source', () => {
  let source: JsonSource;
  beforeEach(() => {
    source = new JsonSource('./fixtures/not-a-file.json');
  });
  describe('when matchesFor is called', () => {
    it('raises an error', () => {
      expect(() => source.matchesFor('2000-01-01')).toThrow();
    });
  });
});
