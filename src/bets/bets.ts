import type { MatchBetRows, MatchBets } from './types';
import type { Source } from '../sources/types';
import type { Strategy } from '../strategies/types';
import type { Printer } from '../printers/types';
import type { Logs } from '../logs';

export class Bets implements MatchBets {
  constructor(
    private source: Source,
    private strategy: Strategy,
    private log: Logs,
    private date: string
  ) {}
  async bets(): Promise<MatchBetRows> {
    this.log.info('Fetching matches from source ....');
    const matches = await this.source.matchesFor(this.date);
    this.log.info('Found matches from source ....');
    this.log.info(`${matches.length} matches from source`);
    return matches.map((m) => this.strategy.bet(m));
  }
  async printTo(printer: Printer): Promise<void> {
    printer.print(await this.bets());
  }
}
