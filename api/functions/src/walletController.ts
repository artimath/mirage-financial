import { Response } from "express";
import { db } from "./config/firebase";

type WalletType = {
  address: string;
};

type Request = {
  body: WalletType;
  params: { walletAddress: string };
};
