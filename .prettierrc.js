module.exports = {
	bracketSameLine: false,
	endOfLine: 'auto',
	printWidth: 100,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	overrides: [
		{
			files: '*.json',
			options: {
				useTabs: false,
			},
		},
	],
};
