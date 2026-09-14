module.exports = {
	preset: 'jest-expo',
	clearMocks: true,
	watchman: false,
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
		'!src/assets/**',
		'!src/styles/**',
		'!src/**/style.js',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
	],
};
