if command -v nvm >/dev/null 2>&1; then
	nvm use --silent
elif [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
	export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
	. "$NVM_DIR/nvm.sh"
	nvm use --silent
fi
