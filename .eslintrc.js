module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        es6: true,
        node: true
    },
    extends: [
        'standard',
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": {
            "allowExpressions": true
        },
        "@eslint-disable-next-line no-prototype-builtins": {
            "allowExpressions": true
        }
    }
}