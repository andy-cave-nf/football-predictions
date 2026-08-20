import { ErrorHandledSource, RuleValidatedSource } from '../../../src/sources/shared';
import { type Source, SourceError, type SourceMatch } from '../../../src/sources/types';
import { type MatchRule, MatchRuleError } from '../../../src/sources/rules';
import { StubSource } from '../utils';

describe('Given a source that raises an error that is wrapped in error handling', () => {
  let source: ErrorHandledSource;
  describe('when the matches are processed', () => {
    beforeEach(() => {
      const erroredSource: Source = {
        matchesFor(_date) {
          throw new Error('Boom');
        },
      };
      source = new ErrorHandledSource(erroredSource);
    });
    it('raises a Source Error', () => {
      expect(() => source.matchesFor('2020-01-01')).toThrow(SourceError);
    });
  });
});

describe('Given a source', () => {
  let source: Source;
  describe('when a match is processed with a match rule error', () => {
    beforeEach(() => {
      const rule: MatchRule = (_matches: SourceMatch[]) => {
        throw new MatchRuleError('Boom');
      };
      source = new RuleValidatedSource(new StubSource([]), [rule]);
    });
    it('raises a Source Error', () => {
      expect(() => source.matchesFor('2020-01-01')).toThrow(SourceError);
    });
  });
  describe('when a match is processed without a validation error', () => {
    let origin: Source;
    beforeEach(() => {
      origin = new StubSource([]);
      const rule: MatchRule = (_matches: SourceMatch[]) => {};
      source = new RuleValidatedSource(origin, [rule]);
    });
    it('returns the match unchanged', () => {
      expect(source.matchesFor('2000-01-01')).toEqual(origin.matchesFor('2000-01-01'));
    });
  });
});
