import type { MatchBets } from './bets/types';
import type { Options } from './bin';

export function run(options: Options, bets: MatchBets) {
  bets.bet(options.date, options.filepath);
}
