import type { Source } from './sources/types';
import type { Printer } from './printers/types';
import type { Strategy } from './strategies/types';
import { Bets } from './bets/bets';

export function run(date: string, source: Source, printer: Printer, strategy: Strategy) {
  const bets = new Bets(source, strategy, date);
  bets.printTo(printer);
}
