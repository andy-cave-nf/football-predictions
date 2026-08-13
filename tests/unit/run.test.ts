import type { MatchBets } from '../../src/bets/types';
import { run } from '../../src/run';

describe('Given a date, filepath and bet object', () => {
  let date: string;
  let filepath: string;
  let bet: MatchBets;
  let betCalls: Array<{ date: string; filepath: string }>;
  beforeEach(() => {
    date = '2000-01-01';
    filepath = 'bets.json';
    betCalls = [];
    bet = {
      bet(date, filepath) {
        betCalls.push({ date, filepath });
      },
    };
  });
  describe('when the run function is called', () => {
    beforeEach(() => {
      run({ date, filepath }, bet);
    });
    it('calls the bet method on bets', () => {
      expect(betCalls).toStrictEqual([{ date, filepath }]);
    });
  });
});
