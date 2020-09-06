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
		'no-tabs': 0,
		'vue/singleline-html-element-content-newline': 0,
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1
		}],
		"vue/max-attributes-per-line": ["error", {
			"singleline": 4,
			"multiline": {
				"max": 1,
				"allowFirstLine": false
			}
		}]
    }
}
