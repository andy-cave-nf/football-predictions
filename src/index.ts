import { buildProgram } from './bin/bin';
import { defaultDependencies } from './bin/dependencies';

await buildProgram(defaultDependencies).parseAsync();
