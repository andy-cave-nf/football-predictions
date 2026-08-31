import type { MatchBetRows } from '../../src/bets/types';
import { run } from '../../src/run';
import type { SourceMatch } from '../../src/sources/types';
import { StubPrinter, StubSource, StubStrategy } from './utils';
import type { Dependencies } from '../../src/bin/dependencies';
import { NullLog } from '../../src/logs';

describe('Given a source, a printer and a strategy', () => {
  let deps: Dependencies;
  let printed: MatchBetRows;
  let sourceMatches: SourceMatch[];
  beforeEach(() => {
    printed = [];
    sourceMatches = [
      { home: 'Arsenal', away: 'Chelsea', odds: { home: 1.1, away: 3.5, draw: 2.0 } },
      { home: 'Manchester United', away: 'Aston Villa', odds: { home: 1.8, away: 3.2, draw: 2.1 } },
    ];
    deps = {
      source: new StubSource(sourceMatches),
      printer: (_filepath) => new StubPrinter(printed),
      strategy: new StubStrategy(),
      log: new NullLog(),
    };
  });
  describe('when run is called with a date', () => {
    beforeEach(() => {
      run('2000-01-01', 'filepath', deps);
    });
    it('prints bets for each fixture on the given date', () => {
      expect(printed).toStrictEqual(sourceMatches.map((m) => deps.strategy.bet(m)));
    });
  });
});
