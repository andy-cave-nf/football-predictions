import { buildProgram } from '../../src/bin';
import type { Command } from 'commander';
import { mkdtempSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { MatchBetRowsSchema } from '../../src/bets/types';

describe('Given a football predictions cli', () => {
  let program: Command;
  let date: string;
  let outputName: string;
  beforeEach(() => {
    program = buildProgram();
  });
  describe('when invoked with a valid date and valid output path', () => {
    beforeEach(() => {
      date = '2000-01-01';
      const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
      outputName = join(outputPath, 'bets.json');
      program.parse(['node', 'cli', date, outputName]);
    });
    it('writes valid bets to the given path', () => {
      const actual = JSON.parse(readFileSync(outputName, 'utf8'));
      const result = MatchBetRowsSchema.safeParse(actual);
      expect(result.success, JSON.stringify(result.error?.issues, null, 2)).toBe(true);
    });
  });
  describe('when invoked with an invalid date', () => {
    beforeEach(() => {
      date = 'not-a-date';
      const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
      outputName = join(outputPath, 'bets.json');
    });
    it('an error is raised', () => {
      expect(() => program.parse(['node', 'cli', date, outputName])).toThrow();
    });
  });
  describe('when invoked with an invalid path', () => {
    beforeEach(() => {
      date = '2000-01-01';
      const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
      outputName = join(outputPath, 'not-a-json');
    });
    it('an error is raised', () => {
      expect(() => program.parse(['node', 'cli', date, outputName])).toThrow();
    });
  });
});
