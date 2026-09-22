module.exports = {
	preset: 'jest-expo',
	clearMocks: true,
	watchman: false,
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/assets/**',
		'!src/styles/**',
		'!src/**/style.js',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
	],
};
