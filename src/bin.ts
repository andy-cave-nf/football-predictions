import { Command } from 'commander';
import { SimpleBet } from './bets/match_bets';
import { format } from 'date-fns';
import { run } from './run';
import { z } from 'zod';

export const OptionsSchema = z.object({
  date: z.iso.date(),
  filepath: z.string().refine((p) => p.endsWith('.json')),
});

export type Options = z.infer<typeof OptionsSchema>;

export function buildProgram(): Command {
  const program = new Command();
  program.name('football-predictions').description('CLI to football predictions');

  program
    .argument('[date]', 'date string as YYYY-MM-DD', format(new Date(), 'yyyy-MM-dd'))
    .argument('[filepath]', 'output json path', 'bets.json')
    .action((date: string, filepath: string) => {
      const result = OptionsSchema.safeParse({ date, filepath });
      if (!result.success) {
        console.error(z.prettifyError(result.error));
        process.exit(1);
      }
      run(result.data, new SimpleBet());
    });
  return program;
}
