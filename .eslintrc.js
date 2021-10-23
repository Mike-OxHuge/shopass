module.exports = {
	root: true,

	env: {
		node: true,
	},

	parserOptions: {
		parser: 'babel-eslint',
	},

	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'prettier/prettier': 'error',
		// useTabs: 'on',
	},
	plugins: ['prettier'],
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/prettier',
		'prettier/vue',
		'plugin:prettier/recommended',
		'prettier',
	],
}
