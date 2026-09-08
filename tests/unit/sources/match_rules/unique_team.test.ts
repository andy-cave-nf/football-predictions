import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, uniqueTeams } from '../../../../src/sources/rules';

describe('Given the unique team rule', () => {
  let matches: SourceMatch[];
  describe('when all teams are unique between matches', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Man U' },
          away: { id: '2', name: 'Man C' },
          odds: { home: 1.3, away: 1.4, draw: 1.5 },
        },
        {
          matchId: '2',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '3', name: 'Chelsea' },
          away: { id: '4', name: 'Arsenal' },
          odds: { home: 1.2, away: 1.3, draw: 1.6 },
        },
      ];
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).not.toThrow(MatchRuleError);
    });
  });
  describe('when a team plays more than one match in the source matches', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Man U' },
          away: { id: '2', name: 'Man C' },
          odds: { home: 1.3, away: 1.4, draw: 1.5 },
        },
        {
          matchId: '2',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '3', name: 'Chelsea' },
          away: { id: '1', name: 'Man U' },
          odds: { home: 1.2, away: 1.3, draw: 1.6 },
        },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the same match is repeated in the source matches', () => {
    beforeEach(() => {
      matches = [
        {
          matchId: '1',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Man U' },
          away: { id: '2', name: 'Man C' },
          odds: { home: 1.2, away: 1.3, draw: 1.6 },
        },
        {
          matchId: '2',
          kickoff: '2000-01-01T17:30:00Z',
          source: 'stub',
          home: { id: '1', name: 'Man U' },
          away: { id: '2', name: 'Man C' },
          odds: { home: 1.2, away: 1.3, draw: 1.6 },
        },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).toThrow(MatchRuleError);
    });
  });
});
