#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
. .husky/node-version.sh
: "${ANDROID_SERIAL:?Set ANDROID_SERIAL to a disposable Android emulator}"
[[ "$ANDROID_SERIAL" == emulator-* ]] || { echo 'Use a disposable emulator, not a personal device.' >&2; exit 1; }
command -v adb >/dev/null
command -v maestro >/dev/null
artifact_dir="${E2E_ARTIFACT_DIR:-e2e/artifacts/$(date +%Y%m%d-%H%M%S)}"
mkdir -p "$artifact_dir"
original_scale="$(adb -s "$ANDROID_SERIAL" shell settings get system font_scale | tr -d '\r')"
original_size="$(adb -s "$ANDROID_SERIAL" shell wm size | sed -n 's/Override size: //p' | tr -d '\r')"
original_density="$(adb -s "$ANDROID_SERIAL" shell wm density | sed -n 's/Override density: //p' | tr -d '\r')"
restore_display() {
 adb -s "$ANDROID_SERIAL" shell wm size "${original_size:-reset}"
 adb -s "$ANDROID_SERIAL" shell wm density "${original_density:-reset}"
 adb -s "$ANDROID_SERIAL" shell settings put system font_scale "$original_scale"
}
trap restore_display EXIT
export MAESTRO_CLI_NO_ANALYTICS=1
export MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED=true
adb -s "$ANDROID_SERIAL" reverse tcp:8081 tcp:8081
for profile in ${E2E_PROFILES:-compact regular large-font}; do
 case "$profile" in
  compact) size=640x1136; density=320; scale=1.0 ;;
  regular) size=864x1920; density=320; scale=1.0 ;;
  large-font) size=864x1920; density=320; scale=1.3 ;;
  *) echo "Unknown visual profile: $profile" >&2; exit 1 ;;
 esac
 adb -s "$ANDROID_SERIAL" shell wm size "$size"
 adb -s "$ANDROID_SERIAL" shell wm density "$density"
 adb -s "$ANDROID_SERIAL" shell settings put system font_scale "$scale"
 for repetition in ${E2E_REPETITIONS:-1 2}; do
  node scripts/e2e-seed.mjs
  output="$artifact_dir/$profile/run-$repetition"
  mkdir -p "$output"
  adb -s "$ANDROID_SERIAL" logcat -c
  # Every top-level flow clears the app state; fixtures reset before each suite.
  status=0
  maestro --device "$ANDROID_SERIAL" test --format junit --output "$output/report.xml" --test-output-dir "$output" "${E2E_FLOW:-.maestro/}" || status=$?
  adb -s "$ANDROID_SERIAL" logcat -d > "$output/logcat.txt"
  [[ "$status" == 0 ]] || exit "$status"
 done
done
printf 'E2E artifacts: %s\n' "$artifact_dir"
