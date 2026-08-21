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
  async bets(): Promise<MatchBetRows> {
    const matches = await this.source.matchesFor(this.date);
    return matches.map((m) => this.strategy.bet(m));
  }
  async printTo(printer: Printer): Promise<void> {
    printer.print(await this.bets());
  }
}
