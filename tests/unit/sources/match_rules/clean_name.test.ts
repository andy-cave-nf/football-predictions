import { cleanName } from '../../../../src/sources/rules';

describe('Given the clean name process', () => {
  let name: string;
  describe('when a lower cased, whitespace stripped name is cleaned', () => {
    beforeEach(() => {
      name = 'clean team';
    });
    it('returns the same name', () => {
      expect(cleanName(name)).toEqual(name);
    });
  });
  describe('when a mixed case name is cleaned', () => {
    beforeEach(() => {
      name = 'UnClEaN';
    });
    it('returns the name lowercased', () => {
      expect(cleanName(name)).toEqual('unclean');
    });
  });
  describe('when a name with padded whitespace is cleaned', () => {
    beforeEach(() => {
      name = '    unclean     ';
    });
    it('returns the name trimmed', () => {
      expect(cleanName(name)).toEqual('unclean');
    });
  });
});
