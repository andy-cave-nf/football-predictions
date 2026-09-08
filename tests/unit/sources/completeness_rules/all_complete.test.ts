import type { RawMatch } from '../../../../src/sources/types';
import { allComplete } from '../../../../src/sources/raw/completeness';

describe('Given the skip null rule', () => {
  let matches: RawMatch[];
  describe('when the match is parsed with non null entries', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('returns the match', () => {
      expect(allComplete(matches)).toStrictEqual(matches);
    });
  });
  describe('when the match is parsed with a null matchId', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: null,
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null kickoff', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: null,
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null home id', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: null, name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null home name', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: null },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null away id', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: null, name: 'Spurs' },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null away name', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: null },
          odds: { home: 1.1, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null home odds', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: null, away: 3.5, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null away odds', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.2, away: null, draw: 2.0 },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null draw odds', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.2, away: 3.5, draw: null },
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
  describe('when the match is parsed with a null odds', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: null,
        },
      ];
    });
    it('skips the match', () => {
      expect(allComplete(matches)).toStrictEqual([]);
    });
  });
});
