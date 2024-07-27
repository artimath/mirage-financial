# Kings Armory / Tower

## Overview
Kings Armory / Tower is a decentralized finance (DeFi) application that allows users to interact with the Guard BUSD certainty vault. This project provides a basic MVP (Minimum Viable Product) for connecting to a MetaMask account and querying vault data.

## Features
- Connect to MetaMask wallet
- Query Guard BUSD certainty vault for:
  - Wallet balance in the vault
  - Share price
  - Total LP (Liquidity Provider) tokens owned
- Calculate pool ownership and token values:
  - Determine share of total pool
  - Calculate underlying token amounts
  - Fetch token prices from CoinGecko API
  - Display total value in vault and for each underlying token

## Technical Details
The application performs the following operations:
1. Connects to the user's MetaMask account
2. Queries the Guard BUSD certainty vault using the connected address
3. Calculates total LP tokens owned (Balance * Share Price)
4. Retrieves total pool LP supply
5. Calculates user's share of the total pool
6. Determines the amount of each underlying token based on ownership percentage
7. Fetches current token prices from CoinGecko API
8. Calculates and displays total value in the vault and for each token

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies

## Usage
In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Technologies Used
- React.js
- MetaMask
- Ethereum Web3 API
- CoinGecko API

## Contributing
Contributions are welcome. Please open an issue or submit a pull request for any improvements.

## License
[Add your license information here]

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
