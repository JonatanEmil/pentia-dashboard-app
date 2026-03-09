import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import pluginOxlint from 'eslint-plugin-oxlint';
import stylistic from '@stylistic/eslint-plugin';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        ignores: ['src/router/**'],
        name: 'app/files-to-lint',
        files: ['**/*.{vue,ts,mts,tsx}'],
        plugins: { '@stylistic': stylistic },
        rules: {
            'indent': ['error', 4],
            'no-console': 'warn',              // Advar om console.log i production
            'no-debugger': 'error',            // Forbyd debugger statements
            'no-unused-vars': 'error',         // Ubrugte variabler
            'no-undef': 'error',               // Udefinerede variabler
            'no-var': 'error',                 // Forbyd var, brug let/const
            'prefer-const': 'error',           // Brug const hvor muligt
            'no-duplicate-imports': 'error',   // Ingen duplicate imports
            'no-unreachable': 'error',         // Kode efter return/throw
            '@typescript-eslint/array-type': ['error', { 'default': 'array' }],
            '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/type-annotation-spacing': 'error',
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            ],
            '@stylistic/max-len': [
                'error',
                {
                    code: 100,
                    tabWidth: 4,
                    ignoreUrls: true,
                    ignoreStrings: false,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],
            '@stylistic/jsx-max-props-per-line': ['error', { maximum: 2 }],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': 'error',
            '@stylistic/comma-dangle': ['error', 'always-multiline'],

        },
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

    ...pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
    },

    ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
);
