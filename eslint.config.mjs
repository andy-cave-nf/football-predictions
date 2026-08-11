// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import vitest from '@vitest/eslint-plugin';


export default defineConfig({
        files: ['**/*.{js,ts}'],
        extends: [eslint.configs.recommended, tseslint.configs.recommended],
},
    {
        files:['tests/**'],
        plugins: { vitest },
        rules: { ...vitest.configs.recommended.rules },

    },
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
        }
    },
    prettierConfig,
);