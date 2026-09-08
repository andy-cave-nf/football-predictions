import { type EspnFixtures, EspnFixturesSchema } from '../../../src/sources/raw/schema/espn';
import { readFileSync } from 'node:fs';

import { espnExtract, moneyLineToDecimal } from '../../../src/sources/raw/extract';
import { allComplete } from '../../../src/sources/raw/completeness';
import { NullLog } from '../../../src/logs';

describe('Given a saved ESPN fixtures response for 2026-08-21', () => {
  let response: EspnFixtures;
  beforeEach(() => {
    const raw = JSON.parse(readFileSync('./fixtures/espn.fixtures.json', 'utf8'));
    response = EspnFixturesSchema.parse(raw);
  });
  describe('when it is parsed', () => {
    it('extracts the Arsenal vs Coventry match', () => {
      expect(espnExtract(response, new NullLog(), allComplete)).toStrictEqual([
        {
          matchId: '401879301',
          kickoff: '2026-08-21T19:00Z',
          home: { id: '359', name: 'Arsenal' },
          away: { id: '388', name: 'Coventry City' },
          odds: {
            home: 1.2,
            away: 14,
            draw: 7,
          },
          source: 'ESPN',
        },
      ]);
    });
  });
});
describe('MoneyLine to Decimal odds', () => {
  let moneyLine: number;
  describe('Given moneyline odds that are greater than 100', () => {
    beforeEach(() => {
      moneyLine = 600;
    });
    describe('when it is parsed', () => {
      it('returns the odds as decimal', () => {
        expect(moneyLineToDecimal(moneyLine)).toBeCloseTo(7);
      });
    });
  });
  describe('Given moneyline odds that are less than -100', () => {
    describe('when it is parsed', () => {
      beforeEach(() => {
        moneyLine = -400;
      });
      it('returns the odds as decimal', () => {
        expect(moneyLineToDecimal(moneyLine)).toBeCloseTo(1.25);
      });
    });
  });
  describe('Given moneyline odds between -100 and 100', () => {
    describe('when it is parsed', () => {
      beforeEach(() => {
        moneyLine = 10;
      });
      it('raises a RangeError', () => {
        expect(() => moneyLineToDecimal(moneyLine)).toThrow(RangeError);
      });
    });
  });
});
