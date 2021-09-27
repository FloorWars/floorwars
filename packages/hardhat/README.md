Usage:
In tab #1:

```
MAINNET_ALCHEMY_KEY=some_alchemy_key npx hardhat node --network hardhat
```

In tab #2:

```
MAINNET_ALCHEMY_KEY=some_alchemy_key npx hardhat run scripts/bootstrap.js --network hardhat
```

Tab 1 creates the localhost:8545 and Tab 2 runs the script to spoof account and transfer yourself a shitload of tokens (courtesy of Wintermute)
Tab 1 should continue running and be forked version of mainnet. Tab 2 will terminate when the script ends, and the instance at localhost:8545 should be loaded with tokens for you
