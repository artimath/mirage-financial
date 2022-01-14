import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  KNIGHT_LP_ABI,
  KNIGHT_LP_ADDRESS,
} from "../contracts/utils/KnightLPPool-Config";
const formatEther = ethers.utils.formatEther;

const roundToDecimal = (num, place) => {
  const rounded = +(Math.round(num * 10 ** place) / 10 ** place);
  return rounded;
};

function CompounderAccountData(props) {
  const { walletAddress, contract, provider } = props;

  const [balance, setBalance] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const [walletLP, setWalletLP] = useState(0);

  // Functions to pull data from GuardBUSD-AC-Contract
  const getBalanceOf = async (walletAddress, contract) => {
    const walletBalance = await contract.balanceOf(walletAddress);
    setBalance(formatEther(walletBalance));
  };

  const getPricePerShare = async (contract) => {
    const sharePrice = await contract.getPricePerFullShare();
    setSharePrice(formatEther(sharePrice));
  };

  useEffect(() => {
    getBalanceOf(walletAddress, contract);
    getPricePerShare(contract);
    console.log("WalletLP is ", walletLP);
  }, [walletAddress, contract, walletLP]);

  useEffect(() => {
    setWalletLP(balance * sharePrice);
  }, [balance, setBalance, walletLP, setWalletLP, sharePrice]);

  // Functions to pull data from Knight LP Pool
  const [totalSupplyOfLP, setTotalSupplyOfLP] = useState(0);
  const [token0Supply, setToken0Supply] = useState(0);
  const [token1Supply, setToken1Supply] = useState(0);
  const [token0Price, setToken0Price] = useState(0);
  const [token1Price, setToken1Price] = useState(0);

  const getTotalSupplyOfLP = async (contract) => {
    const res = await contract.totalSupply();
    setTotalSupplyOfLP(formatEther(res));
  };

  const getTokenSupply = async (contract) => {
    const res = await contract.getReserves();
    console.log(res);
    setToken0Supply(formatEther(res["_reserve0"]));
    setToken1Supply(formatEther(res["_reserve1"]));
  };

  const fetchTokenPrice = async (tokenAddress) => {
    const api_url = `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=USD`;

    // TODO: Get the token price fetch to return correctly.
    console.log(api_url);
    try {
      const res = await fetch(api_url);
      console.log(res);
      const json = await res.json();
      console.log(json);
      console.log(tokenAddress);
      const price = Object.values(json)[0]["usd"];
      console.log(price);
      return price;
    } catch (error) {
      console.error("Failed during fetch", error);
    }
  };

  const getAndSetTokenPrices = async (contract) => {
    const token0Address = await contract.token0();
    const token1Address = await contract.token1();

    setToken0Price(await fetchTokenPrice(token0Address));
    setToken1Price(await fetchTokenPrice(token1Address));
  };

  useEffect(() => {
    const knightLPContract = new ethers.Contract(
      KNIGHT_LP_ADDRESS,
      KNIGHT_LP_ABI,
      provider
    );
    getTotalSupplyOfLP(knightLPContract);
    getTokenSupply(knightLPContract);
    getAndSetTokenPrices(knightLPContract);
  });

  return (
    <div>
      {console.log(balance)}
      <p>Vault Address: {contract.address}</p>
      <p>Balance of Account: {roundToDecimal(balance, 2)}</p>
      <p>Price per Share: {roundToDecimal(sharePrice, 2)}</p>
      <p>Total LP: {roundToDecimal(walletLP, 2)} </p>
      <hr />
      <p>Total Supply of LP: {roundToDecimal(totalSupplyOfLP, 2)}</p>
      <p>
        Percantage of Pool Owned:{" "}
        {roundToDecimal(walletLP / totalSupplyOfLP, 7)}%
      </p>
      <p>Total Supply of BUSD: {roundToDecimal(token0Supply, 2)}</p>
      <p>Total Supply of GUARD: {roundToDecimal(token1Supply, 2)}</p>
      <hr />
      <p>
        <span>Wallet BUSD Portion: </span>
        {roundToDecimal(token0Supply * (walletLP / totalSupplyOfLP), 2)}
      </p>
      <p>BUSD/USD Price: {token0Price}</p>
      <p>
        <span>Value of BUSD Holdings: </span>
        {roundToDecimal(token0Supply * (walletLP / totalSupplyOfLP), 2) *
          token0Price}{" "}
      </p>
      <p>
        <span>Wallet Guard Portion: </span>
        {roundToDecimal(token1Supply * (walletLP / totalSupplyOfLP), 2)}
      </p>
      <p>Guard/USD Price: {token1Price}</p>
      <p>
        <span>Value of GUARD Holdings: </span>
        {roundToDecimal(
          token1Supply * (walletLP / totalSupplyOfLP) * token1Price,
          2
        )}
      </p>
      <p>
        Total Wallet Holdings:{" "}
        {roundToDecimal(
          token1Supply * (walletLP / totalSupplyOfLP) * token1Price +
            token0Supply * (walletLP / totalSupplyOfLP) * token0Price,
          2
        )}
      </p>
    </div>
  );
}

export default CompounderAccountData;
