import { mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

export function makeOutput(outputName: string = 'bets.json'): string {
  const outputPath = mkdtempSync(join(tmpdir(), 'bets'));
  return join(outputPath, outputName);
}
