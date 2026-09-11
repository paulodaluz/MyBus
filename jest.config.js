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
			branches: 20,
			functions: 20,
			lines: 20,
			statements: 20,
		},
	},
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
	],
};
