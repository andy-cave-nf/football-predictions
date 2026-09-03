import type { Source, SourceMatch } from '../../src/sources/types';
import type { Printer } from '../../src/printers/types';
import type { MatchBetRows, MatchBetType } from '../../src/bets/types';
import type { Strategy } from '../../src/strategies/types';
import type { Probability } from '../../src/strategies/probabilities/types';
import type { Stake } from '../../src/strategies/stakes/types';
import type { OutcomeDistribution } from '../../src/shared';
import type { Ratings } from '../../src/strategies/probabilities/ratings';

export class StubSource implements Source {
  constructor(private matches: SourceMatch[]) {}
  async matchesFor(_date: string): Promise<SourceMatch[]> {
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

export class StubStrategy implements Strategy {
  bet(match: SourceMatch): MatchBetType {
    return {
      teams: { home: match.home, away: match.away },
      probability: { home: 0.3, away: 0.3, draw: 0.4 },
      odds: { home: 1.1, away: 1.1, draw: 1.1 },
      stake: { home: 0.1, away: 0.1, draw: 0.1 },
    };
  }
}

export class StubProbability implements Probability {
  constructor(private prediction: OutcomeDistribution = { home: 0.3, away: 0.3, draw: 0.4 }) {}
  forMatch(_match: SourceMatch): OutcomeDistribution {
    return this.prediction;
  }
}

export class StubStake implements Stake {
  constructor(private wager: OutcomeDistribution = { home: 0, away: 0, draw: 0 }) {}
  stake(_prediction: OutcomeDistribution, _odds: OutcomeDistribution): OutcomeDistribution {
    return this.wager;
  }
}

export class StubRatings<T> implements Ratings<T> {
  constructor(private ratings: Record<string, T>) {}
  ratingFor(id: string): T {
    const rating = this.ratings[id];
    if (rating === undefined) {
      throw new Error(`Rating not found for ${id}`);
    }
    return rating;
  }
}
export const HARDCODED_MATCH: SourceMatch = {
  home: 'Arsenal',
  away: 'Chelsea',
  odds: { home: 1.5, away: 1.4, draw: 1.6 },
};
export const HARDCODED_BET: MatchBetType = {
  teams: { home: HARDCODED_MATCH.home, away: HARDCODED_MATCH.away },
  stake: { home: 0.1, away: 0.1, draw: 0.1 },
  probability: { home: 0.3, away: 0.3, draw: 0.4 },
  odds: HARDCODED_MATCH.odds,
};

export const HARDCODED_PREDICTION: OutcomeDistribution = {
  home: 0.3,
  away: 0.25,
  draw: 0.45,
};

export const HARDCODED_ODDS: OutcomeDistribution = {
  home: 4.0,
  away: 4.0,
  draw: 2.0,
};
