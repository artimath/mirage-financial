import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  KNIGHT_LP_ABI,
  KNIGHT_LP_ADDRESS,
} from "../contracts/utils/KnightLPPool-Config";
import {
  GUARDBUSD_AC_ABI,
  GUARDBUSD_AC_ADDRESS,
} from "../contracts/utils/GuardBUSD-AC-Contract";
import { WalletContext } from "../contexts/WalletContext";

const formatEther = ethers.utils.formatEther;

const roundToDecimal = (num, place) => {
  const rounded = +(Math.round(num * 10 ** place) / 10 ** place);
  return rounded;
};

function CompounderAccountData() {
  const [walletState] = useContext(WalletContext);
  const walletAddress = walletState.currentAccount;

  const [balance, setBalance] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const [walletLP, setWalletLP] = useState(0);

  const guardBusdContract = new ethers.Contract(
    GUARDBUSD_AC_ADDRESS,
    GUARDBUSD_AC_ABI,
    walletState.provider
  );

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
    getBalanceOf(walletAddress, guardBusdContract);
    getPricePerShare(guardBusdContract);
  });

  useEffect(() => {
    setWalletLP(balance * sharePrice);
  }, [balance, setWalletLP, sharePrice]);

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

    setToken0Supply(formatEther(res["_reserve0"]));
    setToken1Supply(formatEther(res["_reserve1"]));
  };

  const fetchTokenPrice = async (tokenAddress) => {
    const api_url = `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=USD`;

    // TODO: Get the token price fetch to return correctly.

    try {
      const res = await fetch(api_url);

      const json = await res.json();

      const price = Object.values(json)[0]["usd"];

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
      walletState.provider
    );
    getTotalSupplyOfLP(knightLPContract);
    getTokenSupply(knightLPContract);
    getAndSetTokenPrices(knightLPContract);
  });

  return (
    <div className="flex flex-wrap">
      <div className="w-full xl:w-1/2 flex flex-wrap">
        <div className="px-6 pt-6 w-full">
          <div className="border-b-4 border-purple-300 w-3/4">
            <h1 className=" text-2xl">Vault Data</h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 pt-6">
          <div className="bg-gradient-to-b from-purple-200 to-purple-100 border-b-4 border-purple-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-purple-600">
                  <i className="fa fa-dollar-sign fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Supply of BUSD
                </h2>
                <p className="font-bold text-xl">
                  {roundToDecimal(token0Supply, 2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="bg-gradient-to-b from-purple-200 to-purple-100 border-b-4 border-purple-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-purple-600">
                  <i className="fa fa-shield-alt fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Supply of GUARD
                </h2>
                <p className="font-bold text-xl">
                  {roundToDecimal(token1Supply, 2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-indigo-600">
                  <i className="fa fa-search-dollar fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Wallet BUSD Value
                </h2>
                <p className="font-bold text-xl">
                  $
                  {roundToDecimal(
                    token0Supply * (walletLP / totalSupplyOfLP),
                    2
                  ) * token0Price}
                  <span> USD</span>
                </p>
                <p className="text-xs">
                  {roundToDecimal(
                    token0Supply * (walletLP / totalSupplyOfLP),
                    2
                  )}
                  <span> BUSD</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-indigo-600">
                  <i className="fa fa-search-dollar fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Wallet GUARD Value
                </h2>
                <p className="font-bold text-xl">
                  $
                  {roundToDecimal(
                    token1Supply * (walletLP / totalSupplyOfLP) * token1Price,
                    2
                  )}
                  <span> USD</span>
                </p>
                <p className="text-xs">
                  {roundToDecimal(
                    token1Supply * (walletLP / totalSupplyOfLP),
                    2
                  )}
                  <span> GUARD</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-full p-6">
          <div className="bg-gradient-to-b from-emerald-200 to-emerald-100 border-b-4 border-emerald-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-emerald-600">
                  <i className="fa fa-hand-holding-usd fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Value of Holdings
                </h2>
                <p className="font-bold text-xl">
                  {roundToDecimal(
                    token1Supply * (walletLP / totalSupplyOfLP) * token1Price +
                      token0Supply * (walletLP / totalSupplyOfLP) * token0Price,
                    2
                  )}
                  <span> USD</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-wrap content-start">
        <div className="px-6 pt-6 w-full">
          <div className="border-b-4 border-green-300 w-3/4">
            <h1 className=" text-2xl">Pool Data</h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="bg-gradient-to-b from-cyan-200 to-cyan-100 border-b-4 border-cyan-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-cyan-600">
                  <i className="fa fa-piggy-bank fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  LP Deposited
                </h2>
                <p className="font-bold text-xl">
                  {roundToDecimal(walletLP, 2)}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <div className="bg-gradient-to-b from-cyan-200 to-cyan-100 border-b-4 border-cyan-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-cyan-600">
                  <i className="fa fa-coins fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Supply of LP:
                </h2>
                <p className="font-bold text-xl">
                  {roundToDecimal(totalSupplyOfLP, 2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full  p-6">
          <div className="bg-gradient-to-b from-amber-200 to-amber-100 border-b-4 border-amber-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-amber-600">
                  <i className="fa fa-percent fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Portion of Pool Owned
                </h2>
                <p className="font-bold text-xl">
                  {roundToDecimal(walletLP / totalSupplyOfLP, 7)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompounderAccountData;

//eslint-disable-next-line
{
  /* <p>Vault Address: {contract.address}</p>
      <p>Balance of Account: {roundToDecimal(balance, 2)}</p>
      <p>Price per Share: {roundToDecimal(sharePrice, 2)}</p>
      <p></p>
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
      </p> */
}
