import { existsSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

describe('Given the football predictions cli', () => {
  let cliString: string;
  let dateString: string;
  let outputName: string;
  beforeEach(() => {
    cliString = 'src/index.ts';
    dateString = '2000-01-01';
    const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
    outputName = join(outputPath, 'bets.json');
  });
  describe('when it is called with an output file and date', () => {
    beforeEach(() => {
      execFileSync('npx', ['tsx', cliString, dateString, outputName]);
    });
    it('writes the bets to the given path', () => {
      expect(existsSync(outputName)).toBe(true);
    });
  });
});
