import { ErrorHandledSource } from '../../../src/sources/shared';
import { type Source, SourceError } from '../../../src/sources/types';

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
