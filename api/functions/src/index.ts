import * as functions from "firebase-functions";
import * as express from "express";
import { getWallet } from "./walletController";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = express();

// app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.get("/user_wallets/:walletAddress", getWallet);

// app.get("/user_wallets", getAllWallets);
// app.patch("/user_wallets/:walletAddress", updateWallet);
// app.delete("/user_wallets/:walletAddress", deleteWallet);

exports.app = functions.https.onRequest(app);
