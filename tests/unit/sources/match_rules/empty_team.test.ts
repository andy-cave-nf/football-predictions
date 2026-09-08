import type { SourceMatch } from '../../../../src/sources/types';
import { emptyTeam, MatchRuleError } from '../../../../src/sources/rules';

describe('Given the emptyTeam rule', () => {
  let matches: SourceMatch[];
  describe('when the match is validated with valid team', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.01, away: 2.0, draw: 3.0 },
        },
      ];
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).not.toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an empty home team id', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '', name: 'Arsenal' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.01, away: 2.0, draw: 3.0 },
        },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an empty away team id', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '', name: 'Spurs' },
          odds: { home: 1.1, away: 2.0, draw: 3.2 },
        },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined home team name', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: '' },
          away: { id: '2', name: 'Spurs' },
          odds: { home: 1.01, away: 2.0, draw: 3.0 },
        },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined away team name', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Arsenal' },
          away: { id: '2', name: '' },
          odds: { home: 1.1, away: 2.0, draw: 3.2 },
        },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
});
