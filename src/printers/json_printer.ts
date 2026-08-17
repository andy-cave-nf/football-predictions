import type { Printer } from './types';
import type { MatchBetRows } from '../bets/types';
import { writeFileSync } from 'node:fs';

export class JsonPrinter implements Printer {
  constructor(private filepath: string) {}
  print(bets: MatchBetRows): void {
    writeFileSync(this.filepath, JSON.stringify(bets, null, 2));
  }
}
