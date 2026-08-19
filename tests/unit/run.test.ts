import type { MatchBetRows } from '../../src/bets/types';
import { run } from '../../src/run';
import type { Source, SourceMatch } from '../../src/sources/types';
import type { Printer } from '../../src/printers/types';
import type { Strategy } from '../../src/strategies/types';
import { StubPrinter, StubSource, StubStrategy } from './utils';

describe('Given a source, a printer and a strategy', () => {
  let source: Source;
  let printer: Printer;
  let strategy: Strategy;
  let printed: MatchBetRows;
  let sourceMatches: SourceMatch[];
  beforeEach(() => {
    printed = [];
    sourceMatches = [
      { home: 'Arsenal', away: 'Chelsea', odds: { home: 1.1, away: 3.5, draw: 2.0 } },
      { home: 'Manchester United', away: 'Aston Villa', odds: { home: 1.8, away: 3.2, draw: 2.1 } },
    ];
    source = new StubSource(sourceMatches);
    printer = new StubPrinter(printed);
    strategy = new StubStrategy();
  });
  describe('when run is called with a date', () => {
    beforeEach(() => {
      run('2000-01-01', source, printer, strategy);
    });
    it('prints bets for each fixture on the given date', () => {
      expect(printed).toStrictEqual(sourceMatches.map((m) => strategy.bet(m)));
    });
  });
});
