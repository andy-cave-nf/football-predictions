import { Command } from 'commander';
import { format } from 'date-fns';
import { run } from '../run';
import { z } from 'zod';
import type { Dependencies } from './dependencies';

export const OptionsSchema = z.object({
  date: z.iso.date(),
  filepath: z.string().refine((p) => p.endsWith('.json')),
});

export type Options = z.infer<typeof OptionsSchema>;

export function buildProgram(deps: Dependencies): Command {
  const program = new Command();
  program.name('football-predictions').description('CLI to football predictions');

  program
    .option('-d, --date <date>', 'date string as YYYY-MM-DD', format(new Date(), 'yyyy-MM-dd'))
    .option('-o, --filepath <path>', 'output json path', 'bets.json')
    .action(async (options: { date: string; filepath: string }) => {
      const result = OptionsSchema.safeParse({ date: options.date, filepath: options.filepath });
      if (!result.success) {
        console.error(z.prettifyError(result.error));
        process.exit(1);
      }
      await run(result.data.date, result.data.filepath, deps);
    });
  return program;
}
