import type { RawMatch } from '../../../../src/sources/types';
import { allComplete } from '../../../../src/sources/raw/completeness';

describe('Given the skip null rule', () => {
  let matches: RawMatch[];
  describe('when the match is parsed with non null entries', () => {
    beforeEach(() => {
      matches = [
        { home: 'not empty either', away: 'not empty', odds: { home: 1.2, away: 1.3, draw: 1.5 } },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual(matches);
    });
  });
  describe('when the match is parsed with a null home', () => {
    beforeEach(() => {
      matches = [{ home: null, away: 'not empty', odds: { home: 1.2, away: 1.3, draw: 1.5 } }];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null away', () => {
    beforeEach(() => {
      matches = [{ home: 'not empty', away: null, odds: { home: 1.2, away: 1.3, draw: 1.5 } }];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null odds', () => {
    beforeEach(() => {
      matches = [{ home: 'not empty', away: 'also not empty', odds: null }];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
});
