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
import { RatedProbability } from '../strategies/probabilities/probability';
import { DEFAULT_PREDICTION_RULES } from '../strategies/probabilities/rules';
import { MaxStakeOnly, RuleValidatedStake } from '../strategies/stakes/shared';
import { KellyStake } from '../strategies/stakes/stakes';
import { DEFAULT_STAKE_RULES } from '../strategies/stakes/rules';
import { ConsoleLog, type Logs } from '../logs';
import {
  FixedEloMappedRatings,
  FixedEloRatings,
  MappedRatings,
} from '../strategies/probabilities/ratings';
import { EloCalculation } from '../strategies/probabilities/calculations';

export type Dependencies = {
  source: Source;
  printer: (filepath: string) => Printer;
  strategy: Strategy;
  log: Logs;
};

const defaultLog = new ConsoleLog();
export const defaultDependencies: Dependencies = {
  source: new RuleValidatedSource(
    new ErrorHandledSource(
      new ApiSource(new EspnRaw('eng.1', defaultLog), espnExtract, EspnFixturesSchema, defaultLog)
    ),
    DEFAULT_MATCH_RULES
  ),
  printer: (filepath) => new JsonPrinter(filepath),
  strategy: new BetStrategy(
    new RuleValidatedProbability(
      new RatedProbability(
        new MappedRatings(
          new FixedEloMappedRatings('./fixtures/teams_with_espn_ids.json'),
          new FixedEloRatings('./fixtures/elo_ratings.json')
        ),
        EloCalculation
      ),
      DEFAULT_PREDICTION_RULES
    ),
    new RuleValidatedStake(new MaxStakeOnly(new KellyStake(0.5)), DEFAULT_STAKE_RULES),
    defaultLog
  ),
  log: defaultLog,
};
