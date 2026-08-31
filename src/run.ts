import { Bets } from './bets/bets';
import type { Dependencies } from './bin/dependencies';

export async function run(date: string, filepath: string, deps: Dependencies) {
  const bets = new Bets(deps.source, deps.strategy, deps.log, date);
  await bets.printTo(deps.printer(filepath));
}
