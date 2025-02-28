import eslintJs from '@eslint/js'
import { fixupPluginRules } from '@eslint/compat'
import * as stylistic from '@stylistic/eslint-plugin'
import eslintParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import checkFile from 'eslint-plugin-check-file'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import workspacesPlugin from 'eslint-plugin-workspaces'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
const commonRules = {
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/explicit-member-accessibility': ['error'],
  '@typescript-eslint/explicit-module-boundary-types': ['off'],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      format: ['camelCase', 'UPPER_CASE'],
      selector: 'variable',
    },
    {
      custom: {
        match: true,
        regex: 'Interface$',
      },
      format: ['PascalCase'],
      selector: 'interface',
    },
    {
      format: ['PascalCase','camelCase'],
      selector: 'function',
    },
    {
      format: ['PascalCase'],
      selector: 'typeLike',
    },
    {
      custom: {
        match: true,
        regex: 'Interface$',
      },
      format: ['PascalCase'],
      selector: 'interface',
    },
  ],
  '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
  '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
  '@typescript-eslint/no-explicit-any': ['warn'],
  '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
  '@typescript-eslint/no-unused-vars': 'off',
  'check-file/folder-naming-convention': ['warn', {
    'components/*': 'PASCAL_CASE',
    'src/*': 'FLAT_CASE',
  }],
  'check-file/no-index': ['off'],
  'class-methods-use-this': ['off'],
  complexity: ['warn', 12],
  'id-length': ['error', { exceptions: ['_', 'x', 'y', 'z', 's', 'n', 'i'] }],
  'lines-between-class-members': ['error', 'always'],
  'max-depth': ['error', 3],
  'max-len': ['error', { code: 120, ignorePattern: '^(import|. from).*', ignoreTemplateLiterals: true }],
  'max-lines': ['error'],
  'max-nested-callbacks': ['error', 4],
  'max-params': ['error', 6],
  'newline-before-return': ['off'],
  'no-console': 'warn',
  'no-continue': 'error',
  'no-implicit-coercion': ['error'],
  'no-param-reassign': 'error',
  'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
  'no-undef': 'off',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
  'no-void': ['error', { allowAsStatement: true }],
  'perfectionist/sort-array-includes': 'error',
  'perfectionist/sort-astro-attributes': 'error',
  'perfectionist/sort-classes': 'error',
  'perfectionist/sort-enums': 'error',
  'perfectionist/sort-exports': 'error',
  'perfectionist/sort-imports': 'off',
  'perfectionist/sort-interfaces': 'error',
  'perfectionist/sort-intersection-types': 'error',
  'perfectionist/sort-maps': 'off',
  'perfectionist/sort-named-exports': 'error',
  'perfectionist/sort-named-imports': 'off',
  'perfectionist/sort-object-types': 'error',
  'perfectionist/sort-objects': 'error',
  'perfectionist/sort-switch-case': 'error',
  'perfectionist/sort-union-types': 'error',
  'perfectionist/sort-variable-declarations': 'error',
  'require-await': ['error'],
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': ['error'],
  'sort-keys': 'off',
  'linebreak-style': ['error', 'unix'],
}
export default [
  eslintConfigPrettier,
  eslintJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  {
    files: ['**/*.cjs', '**/*.js', '**/*.mjs', '**/*.mts', '**/*.ts', '**/*.tsx'],
    ignores: ['**/dist'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parser: eslintParser,
      parserOptions: {
        ecmaFeatures: true,
        extraFileExtensions: ['.mjs', '.cjs'],
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      'workspaces': workspacesPlugin,
      '@stylistic': stylistic,
      'check-file': checkFile,
      perfectionist,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...commonRules,
      ...workspacesPlugin.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/strict-boolean-expressions': ['error'],
      'check-file/filename-blocklist': ['error', { '**/*.util.ts': '*.utils.ts' }],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{jsx,tsx}': 'PASCAL_CASE',
          'src/**/*.{js,ts}': 'CAMEL_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-match-with-fex': [
        'error',
        {
          '*.error.ts': '**/errors/',
          '*.exception.ts': '**/exceptions/',
          '*.mapper.ts': '**/mappers/',
          '*.repository.ts': '**/repositories/',
          '*.spec.ts': '**/tests/',
        },
      ],
    },
  },
  {
    files: ['*.mts'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    ignores: ['ops/**/*', '**/dist', '**/*.mjs', '**/*.mts', 'tools/**/*'],
  },
]
