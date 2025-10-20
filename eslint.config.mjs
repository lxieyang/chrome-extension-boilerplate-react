/* NOTES:
- Any configurations that use a parser must specify file globs
  to not interfere with other parsers
*/

/** @typedef {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} Config */

import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jsonc from 'eslint-plugin-jsonc';
import react from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

// MJS compatibility with CJS globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Applies the given file glob selectors to the given
 * configurations, adding to any previously set file globs
 * without mutating the given configurations
 * @param {(string | string[])[]} fileGlobs
 * @param {string[]} ignoreGlobs
 * @param {Config[]} configs
 * @returns {Config[]}
 */
function applyToFiles(fileGlobs, ignoreGlobs, configs) {
    return configs.map((config) => {
        const NEW_CONFIG = { ...config };

        NEW_CONFIG.files = (NEW_CONFIG.files ?? []).concat(...fileGlobs);
        NEW_CONFIG.ignores = (NEW_CONFIG.ignores ?? []).concat(...ignoreGlobs);

        return NEW_CONFIG;
    });
}

const REACT_FILE_GLOBS = ['**/*.jsx', '**/*.tsx'];
const JS_FILE_GLOBS = [
    '**/*.js',
    '**/*.cjs',
    '**/*.mjs',
    '**/*.ts',
    '**/*.cts',
    '**/*.mts',
    ...REACT_FILE_GLOBS
];
const JSON_FILE_GLOBS = ['**/*.json'];
const JSON_IGNORE_GLOBS = ['**/.vscode/*.json', '**/tsconfig.json'];
const JSONC_FILE_GLOBS = ['**/*.jsonc', ...JSON_IGNORE_GLOBS];
const JSON5_FILE_GLOBS = ['**/*.json5'];
const ROOT_DIR = path.resolve(__dirname, '..', '..');

/** @type {Config} */
const PROJECT_CONFIG = {
    languageOptions: {
        parserOptions: {
            projectService: {
                defaultProject: path.resolve(ROOT_DIR, 'tsconfig.json'),
                allowDefaultProject: [
                    path.resolve(__dirname, __filename),
                    path.resolve(ROOT_DIR, 'prettier.config.mjs')
                ]
            },
            tsconfigRootDir: ROOT_DIR
        }
    }
};

/** @type {Config} */
const GLOBAL_IGNORE_CONFIG = globalIgnores([
    // Development
    '**/coverage/**',
    '**/test/**',
    '**/testing/**',
    '**/package-lock.json',
    '**/eslint.*',

    // Deployment
    '**/build/**',
    '**/dist/**',
    '/zip/**',
    '**/*.min.*',
    '**/*.bundle.*',
    '**/*.map.js',

    // Secrets
    '**/.DS_Store',
    '**/*.env',
    '**/*.env.*',
    '**/.history',

    // Temporary files
    '**/tmp/**',
    '**/temp/**',
    '**/backup/**',
    '**/cache/**',
    '**/logs/**',
    '**/*.log',

    // Licenses
    '**/LICENSE',
    '**/LICENSE.md',
    '**/*.license'
]);

/**
 * @link https://typescript-eslint.io/users/configs/
 */
const DEFAULT_JS_CONFIGS = applyToFiles(
    JS_FILE_GLOBS,
    [],
    defineConfig([
        js.configs.recommended,
        stylistic.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        {
            languageOptions: {
                parserOptions: {
                    projectService: true,
                    tsconfigRootDir: ROOT_DIR
                }
            }
        }
    ])
);

/**
 * @type {Config[]}
 * @link https://github.com/eslint/json?tab=readme-ov-file#recommended-configuration
 */
const JSON_CONFIGS = [
    {
        languageOptions: {
            parserOptions: {
                extraFileExtensions: ['json', 'jsonc', 'json5']
            }
        }
    },
    ...applyToFiles(
        [...JSON_FILE_GLOBS, ...JSONC_FILE_GLOBS, ...JSON5_FILE_GLOBS],
        [],
        jsonc.configs['flat/base']
    ),
    ...applyToFiles(
        JSON_FILE_GLOBS,
        JSON_IGNORE_GLOBS,
        jsonc.configs['flat/recommended-with-json']
    ),
    ...applyToFiles(
        JSONC_FILE_GLOBS,
        [],
        jsonc.configs['flat/recommended-with-jsonc']
    ),
    ...applyToFiles(
        JSON5_FILE_GLOBS,
        [],
        jsonc.configs['flat/recommended-with-json5']
    ),
    {
        files: [...JSONC_FILE_GLOBS, ...JSON5_FILE_GLOBS],
        rules: {
            'jsonc/no-comments': 'off'
        }
    }
];

/** @type {Config} */
const DEFAULT_REACT_CONFIG = {
    ...react.configs.flat.recommended,
    settings: {
        react: {
            version: 'detect'
        }
    }
};

/** @type {Config[]} */
const JS_CONFIGS = [
    ...DEFAULT_JS_CONFIGS,
    {
        files: JS_FILE_GLOBS,
        rules: {
            /* eslint */

            // https://eslint.style/rules/js/max-len
            'max-len': [
                'warn',
                {
                    code: 80,
                    ignoreComments: true
                }
            ],
            // https://eslint.style/rules/js/no-unexpected-multiline
            'no-unexpected-multiline': ['error'],
            // https://eslint.org/docs/latest/rules/prefer-const
            'prefer-const': ['warn'],

            /* @typescript-eslint */

            // https://typescript-eslint.io/rules/no-empty-object-type
            '@typescript-eslint/no-empty-object-type': [
                'error',
                {
                    allowInterfaces: 'with-single-extends',
                    allowWithName: '^props$'
                }
            ],
            // Ignored if you use createRequire
            // https://typescript-eslint.io/rules/no-require-imports
            '@typescript-eslint/no-require-imports': ['error'],
            // https://typescript-eslint.io/rules/no-unused-vars
            '@typescript-eslint/no-unused-vars': ['warn'],
            // https://typescript-eslint.io/rules/prefer-includes
            '@typescript-eslint/prefer-includes': ['warn'],
            // https://typescript-eslint.io/rules/restrict-template-expressions
            '@typescript-eslint/restrict-template-expressions': [
                'warn',
                {
                    allow: [
                        {
                            name: ['Error', 'URL', 'URLSearchParams'],
                            from: 'lib'
                        }
                    ],
                    allowAny: true,
                    allowBoolean: true,
                    allowNullish: true,
                    allowNumber: true,
                    allowRegExp: true
                }
            ],

            /* @stylistic */

            // https://eslint.style/rules/js/arrow-parens
            '@stylistic/arrow-parens': ['warn', 'always'],
            // https://eslint.style/rules/js/comma-dangle
            '@stylistic/comma-dangle': ['off'],
            // https://eslint.style/rules/js/eol-last
            '@stylistic/eol-last': ['off'],
            // https://eslint.style/rules/js/indent
            '@stylistic/indent': ['off'],
            // https://eslint.style/rules/js/jsx-quotes
            '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
            // https://eslint.style/rules/js/member-delimiter-style
            '@stylistic/member-delimiter-style': [
                'warn',
                {
                    singleline: {
                        delimiter: 'semi',
                        requireLast: true
                    },
                    multiline: {
                        delimiter: 'semi',
                        requireLast: true
                    },
                    overrides: {
                        typeLiteral: {
                            singleline: {
                                delimiter: 'semi',
                                requireLast: false
                            }
                        }
                    }
                }
            ],
            // https://eslint.style/rules/js/no-extra-semi
            '@stylistic/no-extra-semi': ['warn'],
            // https://eslint.style/rules/js/operator-linebreak
            '@stylistic/operator-linebreak': [
                'warn',
                'before',
                {
                    overrides: {
                        '=': 'none',
                        '+=': 'none',
                        '-=': 'none',
                        '*=': 'none',
                        '/=': 'none',
                        '%=': 'none',
                        '>>=': 'none',
                        '<<=': 'none',
                        '>>>=': 'none',
                        '<<<=': 'none'
                    }
                }
            ],
            // https://eslint.style/rules/js/quotes
            '@stylistic/quotes': [
                'warn',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: 'always'
                }
            ],
            // https://eslint.style/rules/js/semi
            '@stylistic/semi': [
                'warn',
                'always',
                {
                    omitLastInOneLineBlock: true,
                    omitLastInOneLineClassBody: true
                }
            ],
            // https://eslint.style/rules/js/brace-style
            '@stylistic/brace-style': [
                'warn',
                'stroustrup',
                { allowSingleLine: false }
            ]
        }
    }
];

/** @type {Config[]} */
const REACT_CONFIGS = [
    DEFAULT_REACT_CONFIG,
    {
        files: REACT_FILE_GLOBS,
        rules: {
            /* @stylistic */

            // https://eslint.style/rules/jsx/jsx-indent-props
            '@stylistic/jsx-indent-props': ['off'],
            // https://eslint.style/rules/jsx/jsx-one-expression-per-line
            '@stylistic/jsx-one-expression-per-line': ['off']
        }
    }
];

/** @type {Config} */
const EXTENSION_CONFIG = {
    files: JS_FILE_GLOBS,
    languageOptions: {
        globals: {
            chrome: 'readonly',
            browser: 'readonly'
        }
    }
};

/** @type {Config[]} */
const CONFIG = [
    PROJECT_CONFIG,
    GLOBAL_IGNORE_CONFIG,
    ...JS_CONFIGS,
    ...JSON_CONFIGS,
    ...REACT_CONFIGS,
    EXTENSION_CONFIG
];

export default CONFIG;
