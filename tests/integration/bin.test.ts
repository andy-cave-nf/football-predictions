import { buildProgram } from '../../src/bin';
import type { Command } from 'commander';
import { mkdtempSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { MatchBetRows } from '../../src/bets/types';

describe('Given a football predictions cli', () => {
  let program: Command;
  let date: string;
  let outputName: string;
  beforeEach(() => {
    program = buildProgram();
    date = '2000-01-01';
    const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
    outputName = join(outputPath, 'bets.json');
  });
  describe('when invoked with a date and output path', () => {
    beforeEach(() => {
      program.parse(['node', 'cli', date, outputName]);
    });
    it('writes valid bets to the given path', () => {
      const actual = JSON.parse(readFileSync(outputName, 'utf8'));
      const result = MatchBetRows.safeParse(actual);
      expect(result.success, JSON.stringify(result.error?.issues, null, 2)).toBe(true);
    });
  });
});
