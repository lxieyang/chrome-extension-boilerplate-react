/**
 * The Prettier configuration
 * @type {import("prettier").Config}
 * @link https://prettier.io/docs/configuration
 */
const CONFIG = {
    singleQuote: true,
    trailingComma: 'none',
    requirePragma: false,
    arrowParens: 'always',
    useTabs: false,
    tabWidth: 4,
    semi: true,
    endOfLine: 'lf',
    printWidth: 80,
    jsxSingleQuote: true,
    singleAttributePerLine: false,
    overrides: [
        {
            files: ['**/*.md', '**/*.yml', '**/*.yaml'],
            options: {
                tabWidth: 2
            }
        }
    ]
};

export default CONFIG;
