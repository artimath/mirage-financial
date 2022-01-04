# Connect to Wallet

- [x] Install Web3
- [x] Connect to MetaMask wallet

# Grab info from contract

- [x] Create contract as object
- [x] Be able to call contract on connect.

# Figure out how to value LP tokens

- [x] Find out how much of each underlying wallet possesses

  - [x] ~Finish api fetch to get token names from BSC scan~ { Just add them maually for now}
  - [x] Update display with proper token names
  - [x] Display percentage of each token that the wallet possesses

- [x] Build out function that fetches token prices from an oracle api.
- [x] Display USD value of underlying
- [x] Display sum of these to approximate total value in LP.

## Bug Fixes

- [ ] Ensure error boundary on missing metamask aka. missing window.ethereum
- [ ] Move bsc api key into env and reset

Knight LP
https://bscscan.com/address/0xfc84b031a5221ced00b6470744af5e5da5710ddc#readContract
Guard AC
https://bscscan.com/address/0x2c2067f751feccfabb6441e88b177207729b67e3#readContract
