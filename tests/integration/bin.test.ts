import { buildProgram } from '../../src/bin';
import type { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { MatchBetRowsSchema } from '../../src/bets/types';
import { makeOutput } from './utils';

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
      outputName = makeOutput();
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
      outputName = makeOutput();
    });
    it('an error is raised', () => {
      expect(() => program.parse(['node', 'cli', date, outputName])).toThrow();
    });
  });
  describe('when invoked with a non-json filename', () => {
    beforeEach(() => {
      date = '2000-01-01';
      outputName = makeOutput('not-a-filename');
    });
    it('an error is raised', () => {
      expect(() => program.parse(['node', 'cli', date, outputName])).toThrow();
    });
  });
  describe('when invoked with different dates', () => {
    let outputNameA: string;
    let outputNameB: string;
    let dateA: string;
    let dateB: string;
    beforeEach(() => {
      dateA = '2000-01-01';
      dateB = '2000-01-02';
      outputNameA = makeOutput('a.json');
      outputNameB = makeOutput('b.json');
      program.parse(['node', 'cli', dateA, outputNameA]);
      program.parse(['node', 'cli', dateB, outputNameB]);
    });
    it('returns different bets', () => {
      const betsA = JSON.parse(readFileSync(outputNameA, 'utf8'));
      const betsB = JSON.parse(readFileSync(outputNameB, 'utf8'));
      expect(betsA).not.toStrictEqual(betsB);
    });
  });
});
