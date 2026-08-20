import { Command } from 'commander';
import { format } from 'date-fns';
import { run } from './run';
import { z } from 'zod';
import { JsonPrinter } from './printers/json_printer';
import { BetStrategy } from './strategies/strategies';
import { JsonSource } from './sources/json_source';
import { ErrorHandledSource, RuleValidatedSource } from './sources/shared';
import { DEFAULT_MATCH_RULES } from './sources/rules';
import { ConstantProbability } from './strategies/probabilities/probability';
import { RuleValidatedProbability } from './strategies/probabilities/shared';
import { DEFAULT_PREDICTION_RULES } from './strategies/probabilities/rules';
import { ConstantStake } from './strategies/stakes/stakes';

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
      run(
        result.data.date,
        new RuleValidatedSource(
          new ErrorHandledSource(new JsonSource('./fixtures/matches.fixture.json')),
          DEFAULT_MATCH_RULES
        ),
        new JsonPrinter(filepath),
        new BetStrategy(
          new RuleValidatedProbability(new ConstantProbability(), DEFAULT_PREDICTION_RULES),
          new ConstantStake()
        )
      );
    });
  return program;
}
