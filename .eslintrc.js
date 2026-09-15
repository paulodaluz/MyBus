module.exports = {
	root: true,
	extends: ['@react-native-community', 'plugin:react/jsx-runtime'],
	overrides: [
		{
			files: ['*.jsx'],
			parser: 'babel-eslint',
		},
		{
			files: ['__tests__/**/*.{js,jsx}', 'jest.setup.js'],
			env: {
				jest: true,
			},
		},
	],
	rules: {
		'no-unused-vars': 'error',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
	},
};
