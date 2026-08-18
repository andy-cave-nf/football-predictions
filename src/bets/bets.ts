import type { MatchBetRows, MatchBets } from './types';
import type { Source } from '../sources/types';
import type { Strategy } from '../strategies/types';
import type { Printer } from '../printers/types';

export class Bets implements MatchBets {
  constructor(
    private source: Source,
    private strategy: Strategy,
    private date: string
  ) {}
  bets(): MatchBetRows {
    const matches = this.source.matchesFor(this.date);
    return matches.map((m) => this.strategy.bet(m));
  }
  printTo(printer: Printer): void {
    printer.print(this.bets());
  }
}
