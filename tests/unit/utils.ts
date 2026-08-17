import type { Source, SourceMatch } from '../../src/sources/types';
import type { Printer } from '../../src/printers/types';
import type { MatchBetRows, MatchBetType } from '../../src/bets/types';
import type { Strategy } from '../../src/strategies/types';

export class StubSource implements Source {
  constructor(private matches: SourceMatch[]) {}
  matchesFor(_date: string): SourceMatch[] {
    return this.matches;
  }
}

export class StubPrinter implements Printer {
  constructor(private paper: MatchBetRows) {}
  print(bets: MatchBetRows) {
    bets.forEach((b) => {
      this.paper.push(b);
    });
  }
}

export class UniformStrategy implements Strategy {
  bet(match: SourceMatch): MatchBetType {
    return {
      teams: { home: match.home, away: match.away },
      probability: { home: 0.3, away: 0.3, draw: 0.4 },
      odds: { home: 1.1, away: 1.1, draw: 1.1 },
      stake: { home: 0.1, away: 0.1, draw: 0.1 },
    };
  }
}

export const HARDCODED_BET: MatchBetType = {
  teams: { home: 'Arsenal', away: 'Chelsea' },
  stake: { home: 0.1, away: 0.1, draw: 0.1 },
  probability: { home: 0.3, away: 0.3, draw: 0.4 },
  odds: { home: 1.5, away: 1.5, draw: 1.5 },
};
