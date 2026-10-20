const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// Expo's development virtual-env module reads .env files even with EXPO_NO_DOTENV.
// Exclude them from the demo bundle so local test values cannot be overwritten.
if (process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST) {
	config.resolver.blockList = /\/\.env(?:\.(?:local|development|production)(?:\.local)?)?$/;
}
module.exports = config;
