/**
 * config
 * @name .eslintrc
 */
module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb-base',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        es6: true,
        node: true,
        commonjs: true,
    },
    rules: {
        'no-undef': 'error',
        'linebreak-style': 0,
        indent: ['error', 4, {
            ignoredNodes: ['TemplateLiteral'],
            SwitchCase: 1,
        }],
        'no-console': 'warn',
        'template-curly-spacing': 'off',
        'object-curly-spacing': 'error',
        semi: 2,
        'no-var': 'error',
        'arrow-spacing': 'error',
        'arrow-parens': 'error',
        'computed-property-spacing': 'error',
        'no-underscore-dangle': 'off',
        'no-unused-vars': 1,
        'consistent-return': 'off',
        'max-len': ['error', { code: 170 }],
        'object-shorthand': 'error',
        'array-callback-return': 'off',
        'no-await-in-loop': 'off',
        'no-plusplus': 'off',
        'no-inner-declarations': 'off',
        'no-shadow': 'off',
        'no-continue': 'off',
        'no-restricted-syntax': 'off',
        'no-return-await': 'off',
        'no-param-reassign': 'off',
        'no-lonely-if': 'off',
        'prefer-destructuring': 'off',
        'no-prototype-builtins': 'off',
        'no-unused-expressions': 'off',
        'guard-for-in': 'off',
        'prefer-spread': 'off',
        'no-sparse-arrays': 'off',
        'func-names': 'off',
        'no-new': 'off',
        'new-cap': 'off',
        'no-nested-ternary': 'off',
        'operator-assignment': 'off',
        'no-useless-escape': 0,
        'no-mixed-operators': 'off',
        'no-tabs': 'off',
        'space-before-function-paren': 'error',
        'space-before-blocks': 'error',
        'space-infix-ops': 'error',
        'space-in-parens': 'error',
        'no-debugger': 'off',
        'no-control-regex': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-unneeded-ternary': 'off',
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    },
};
