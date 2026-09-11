module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'header-max-length': [2, 'always', 60],
		'scope-case': [0],
		'subject-empty': [2, 'never'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'refactor', 'style', 'test', 'doc', 'env', 'build', 'ci'],
		],
	},
};
