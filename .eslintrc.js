module.exports = {
	root: true,
	extends: '@react-native-community',
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
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
	},
};
