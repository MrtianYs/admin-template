module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/strongly-recommended',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'indent': 0,
		'eol-last': 0,
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1
        }]
    }
}
