import { buildProgram } from '../../src/bin/bin';
import type { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { MatchBetRowsSchema } from '../../src/bets/types';
import { makeOutput, testDependencies } from './utils';

describe('Given a football predictions cli', () => {
  let program: Command;
  let date: string;
  let outputName: string;
  beforeEach(() => {
    program = buildProgram(testDependencies);
  });
  describe('when invoked with a valid date and valid output path', () => {
    beforeEach(async () => {
      date = '2000-01-01';
      outputName = makeOutput();
      await program.parseAsync(['node', 'cli', '--date', date, '--filepath', outputName]);
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
      outputName = makeOutput();
    });
    it('an error is raised', async () => {
      await expect(
        program.parseAsync(['node', 'cli', '--date', date, '--filepath', outputName])
      ).rejects.toThrow();
    });
  });
  describe('when invoked with a non-json filename', () => {
    beforeEach(() => {
      date = '2000-01-01';
      outputName = makeOutput('not-a-filename');
    });
    it('an error is raised', async () => {
      await expect(
        program.parseAsync(['node', 'cli', '--date', date, '--filepath', outputName])
      ).rejects.toThrow();
    });
  });
  describe('when invoked with different dates', () => {
    let outputNameA: string;
    let outputNameB: string;
    let dateA: string;
    let dateB: string;
    beforeEach(async () => {
      dateA = '2000-01-01';
      dateB = '2000-01-02';
      outputNameA = makeOutput('a.json');
      outputNameB = makeOutput('b.json');
      await program.parseAsync(['node', 'cli', '--date', dateA, '--filepath', outputNameA]);
      await program.parseAsync(['node', 'cli', '--date', dateB, '--filepath', outputNameB]);
    });
    it('returns different bets', () => {
      const betsA = JSON.parse(readFileSync(outputNameA, 'utf8'));
      const betsB = JSON.parse(readFileSync(outputNameB, 'utf8'));
      expect(betsA).not.toStrictEqual(betsB);
    });
  });
});
