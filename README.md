# DETERMINISTIC JWT KEYS

## Generate deterministic JWT EC keys from bip39 mnemonics

### Usage
```
npm install
# IMPORTANT: put a space before the next command to avoid saving the seed in bash history (or do whatever is needed to do it on your platform)
node index.js "your bip39 mnemonic"
```

Private and public keys will be printed to stdout

### Disclaimer
This script and related libraries have not been audited, use at your own risk.