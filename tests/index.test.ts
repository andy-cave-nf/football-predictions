import { mkdtempSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { simpleBetWithOutput, type SetUp } from './utils';

describe('Given any date and an output json file path', () => {
  let dateString: string;
  let outputName: string;
  beforeEach(() => {
    dateString = '2000-01-01';
    const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
    outputName = join(outputPath, 'bets.json');
  });
  describe('when the orchestrator is called', () => {
    let setup: SetUp;
    beforeEach(() => {
      setup = simpleBetWithOutput();
      setup.bet.bet(dateString, outputName);
    });
    it('writes a single hardcoded match to output file', () => {
      const actual = JSON.parse(readFileSync(outputName, 'utf8'));
      expect(actual).toStrictEqual(setup.rows);
    });
  });
});
