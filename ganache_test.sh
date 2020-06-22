# Testing your smart contract with existing protocols: Ganache fork

# https://github.com/trufflesuite/ganache-cli/issues/732
# For those of you using Node 14, you'll need to launch ganache-cli via node 8, 10, or 12
# until this is fixed. For example, run nvm use 12 && npm install ganache-cli -g to install
# for node 12, and then run ganache-cli with nvm use 12 && ganache-cli.

# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# npm install -g ganache-cli
# nvm use 10 && npm install ganache-cli -g
# nvm use 10 && ganache-cli

# Forks the Main Ethereum network
# ganache-cli -f https://cloudflare-eth.com/  -m "inmate ugly among taste clutch atom shoe salt awake huge setup primary" -i 999 -u 0x56178a0d5F301bAf6CF3e1Cd53d9863437345Bf9
nvm use 10 && ganache-cli -f https://cloudflare-eth.com/ --acctKeys "ganache-acct.json" -m "inmate ugly among taste clutch atom shoe salt awake huge setup primary" -i 999 -u 0x56178a0d5F301bAf6CF3e1Cd53d9863437345Bf9
