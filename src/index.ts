import { Command } from 'commander';
import { format } from 'date-fns';
import { SimpleBet } from './bets/match_bets';

const program = new Command();

program.name('football-predictions').description('CLI to football predictions');

program
  .argument('[date]', 'date string as YYYY-MM-DD', format(new Date(), 'yyyy-MM-dd'))
  .argument('[filepath]', 'output json path', 'bets.json')
  .action((date: string, filepath: string) => {
    const bet = new SimpleBet();
    bet.bet(date, filepath);
  });

program.parse();
