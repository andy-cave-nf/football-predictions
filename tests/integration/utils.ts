import { mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { Dependencies } from '../../src/bin/dependencies';
import { ErrorHandledSource, RuleValidatedSource } from '../../src/sources/shared';
import { JsonSource } from '../../src/sources/sources';
import { DEFAULT_MATCH_RULES } from '../../src/sources/rules';
import { JsonPrinter } from '../../src/printers/json_printer';
import { BetStrategy } from '../../src/strategies/strategies';
import { RuleValidatedProbability } from '../../src/strategies/probabilities/shared';
import { ConstantProbability } from '../../src/strategies/probabilities/probability';
import { DEFAULT_PREDICTION_RULES } from '../../src/strategies/probabilities/rules';
import { MaxStakeOnly, RuleValidatedStake } from '../../src/strategies/stakes/shared';
import { KellyStake } from '../../src/strategies/stakes/stakes';
import { DEFAULT_STAKE_RULES } from '../../src/strategies/stakes/rules';
import { NullLog } from '../../src/logs';

export function makeOutput(outputName: string = 'bets.json'): string {
  const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
  return join(outputPath, outputName);
}
const testLog = new NullLog();
export const testDependencies: Dependencies = {
  source: new RuleValidatedSource(
    new ErrorHandledSource(new JsonSource('./fixtures/matches.fixture.json')),
    DEFAULT_MATCH_RULES
  ),
  printer: (filepath) => new JsonPrinter(filepath),
  strategy: new BetStrategy(
    new RuleValidatedProbability(new ConstantProbability(), DEFAULT_PREDICTION_RULES),
    new RuleValidatedStake(new MaxStakeOnly(new KellyStake(0.5)), DEFAULT_STAKE_RULES),
    testLog
  ),
  log: testLog,
};
