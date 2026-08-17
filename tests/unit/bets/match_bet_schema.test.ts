import { type MatchBetRows, MatchBetRowsSchema } from '../../../src/bets/types';

import { HARDCODED_BET } from '../utils';

describe('Given the match bet schema', () => {
  let bets: MatchBetRows;
  describe('when there are valid bets', () => {
    beforeEach(() => {
      bets = [HARDCODED_BET];
    });
    it('parses successfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(true);
    });
  });
  describe('when the probability is within tolerance', () => {
    beforeEach(() => {
      bets = [
        {
          teams: { home: 'Arsenal', away: 'Chelsea' },
          stake: { home: 0.1, away: 0.1, draw: 0.1 },
          probability: { home: 0.1, away: 0.1, draw: 0.8 - 0.0005 },
          odds: { home: 1.1, away: 1.1, draw: 1.1 },
        },
      ];
    });
    it('parses successfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(true);
    });
  });
  describe('when the probability is outside the tolerance', () => {
    beforeEach(() => {
      bets = [
        {
          teams: { home: 'Arsenal', away: 'Chelsea' },
          stake: { home: 0.1, away: 0.1, draw: 0.1 },
          probability: { home: 0.1, away: 0.1, draw: 0.8 - 0.00051 },
          odds: { home: 1.1, away: 1.1, draw: 1.1 },
        },
      ];
    });
    it('parses unsuccessfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(false);
    });
  });
  describe('when a probability is less than 0', () => {
    beforeEach(() => {
      bets = [
        {
          teams: { home: 'Arsenal', away: 'Chelsea' },
          stake: { home: 0.1, away: 0.1, draw: 0.1 },
          probability: { home: 0.1, away: 0.1, draw: -0.8 },
          odds: { home: 1.1, away: 1.1, draw: 1.1 },
        },
      ];
    });
    it('parses unsuccessfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(false);
    });
  });
  describe('when a stake is less than 0', () => {
    beforeEach(() => {
      bets = [
        {
          teams: { home: 'Arsenal', away: 'Chelsea' },
          stake: { home: -0.1, away: 0.1, draw: 0.1 },
          probability: { home: 0.1, away: 0.1, draw: 0.8 },
          odds: { home: 1.1, away: 1.1, draw: 1.1 },
        },
      ];
    });
    it('parses unsuccessfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(false);
    });
  });
  describe('when the stakes sum to more than 1', () => {
    beforeEach(() => {
      bets = [
        {
          teams: { home: 'Arsenal', away: 'Chelsea' },
          stake: { home: 0.5, away: 0.5, draw: 0.5 },
          probability: { home: 0.1, away: 0.1, draw: 0.8 },
          odds: { home: 1.1, away: 1.1, draw: 1.1 },
        },
      ];
    });
    it('parses unsuccessfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(false);
    });
  });
  describe('when an odd is less than 1', () => {
    beforeEach(() => {
      bets = [
        {
          teams: { home: 'Arsenal', away: 'Chelsea' },
          stake: { home: 0.1, away: 0.1, draw: 0.1 },
          probability: { home: 0.1, away: 0.1, draw: 0.8 },
          odds: { home: 0.9, away: 1.1, draw: 1.1 },
        },
      ];
    });
    it('parses unsuccessfully', () => {
      const result = MatchBetRowsSchema.safeParse(bets);
      expect(result.success).toBe(false);
    });
  });
});
