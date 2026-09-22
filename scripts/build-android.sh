#!/usr/bin/env bash
set -euo pipefail
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"
. .husky/node-version.sh
: "${ANDROID_HOME:?Set ANDROID_HOME to the Android SDK directory}"
: "${JAVA_HOME:?Set JAVA_HOME to a compatible JDK directory}"
build_dir="$(mktemp -d "${TMPDIR:-/tmp}/mybus-android.XXXXXX")"
rsync -a --exclude=.git --exclude=node_modules --exclude=android --exclude=ios --exclude=coverage --exclude=dist "$repo_root/" "$build_dir/"
cd -P "$build_dir"
build_dir="$PWD"
npm ci
CI=1 npx --no-install expo prebuild --platform android --no-install
cd android
./gradlew :react-native-worklets:assembleRelease --no-daemon -PreactNativeArchitectures="${ANDROID_ARCHITECTURES:-arm64-v8a}"
# Reanimated 4.1 looks up the legacy CMake path instead of Worklets' prefab output.
IFS=',' read -r -a build_abis <<< "${ANDROID_ARCHITECTURES:-arm64-v8a}"
worklets_build="../node_modules/react-native-worklets/android/build/intermediates"
for build_abi in "${build_abis[@]}"; do
  mkdir -p "$worklets_build/cmake/release/obj/$build_abi"
  cp "$worklets_build/prefab_package/release/prefab/modules/worklets/libs/android.$build_abi/libworklets.so" "$worklets_build/cmake/release/obj/$build_abi/libworklets.so"
done
./gradlew assembleDebug assembleRelease --no-daemon -PreactNativeArchitectures="${ANDROID_ARCHITECTURES:-arm64-v8a}"
printf 'APKs and native logs remain in: %s/android/app/build/outputs/apk\n' "$build_dir"
