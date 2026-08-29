import type { Source } from '../sources/types';
import type { Printer } from '../printers/types';
import type { Strategy } from '../strategies/types';
import { ErrorHandledSource, RuleValidatedSource } from '../sources/shared';
import { ApiSource } from '../sources/sources';
import { DEFAULT_MATCH_RULES } from '../sources/rules';
import { EspnRaw } from '../sources/raw/raw';
import { espnExtract } from '../sources/raw/extract';
import { EspnFixturesSchema } from '../sources/raw/schema/espn';
import { JsonPrinter } from '../printers/json_printer';
import { BetStrategy } from '../strategies/strategies';
import { RuleValidatedProbability } from '../strategies/probabilities/shared';
import { ConstantProbability } from '../strategies/probabilities/probability';
import { DEFAULT_PREDICTION_RULES } from '../strategies/probabilities/rules';
import { MaxStakeOnly, RuleValidatedStake } from '../strategies/stakes/shared';
import { KellyStake } from '../strategies/stakes/stakes';
import { DEFAULT_STAKE_RULES } from '../strategies/stakes/rules';

export type Dependencies = {
  source: Source;
  printer: (filepath: string) => Printer;
  strategy: Strategy;
};

export const defaultDependencies: Dependencies = {
  source: new RuleValidatedSource(
    new ErrorHandledSource(new ApiSource(new EspnRaw('eng.1'), espnExtract, EspnFixturesSchema)),
    DEFAULT_MATCH_RULES
  ),
  printer: (filepath) => new JsonPrinter(filepath),
  strategy: new BetStrategy(
    new RuleValidatedProbability(new ConstantProbability(), DEFAULT_PREDICTION_RULES),
    new RuleValidatedStake(new MaxStakeOnly(new KellyStake(0.5)), DEFAULT_STAKE_RULES)
  ),
};
