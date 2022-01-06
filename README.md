# Kings Armory / Tower

Basic MVP of connecting to account in metamask.

Then using that address to query the Guard BUSD certainty vault to get wallet balance in vault and share price.

Balance \* shareprice = total LP of pool owned.

Now, we focus on the pool that the vault deposits into.

Pull total pool LP supply. Divide that by LP owned to get share of total pool.

Then multiply that ownership % by the supply of each token to get # of each underlying token.

Then query coingecko api to pull token prices for underlying.

Multiply those and show total value in vault as well as each underlying token.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
