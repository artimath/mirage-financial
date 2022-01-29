import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { hexValue } from "ethers/lib/utils";

const AccountInfo = () => {
  const [walletState] = useContext(WalletContext);
  const smartChainID = 56; // Binance smart chain

  const promptSwitchToSmartChain = async () => {
    // Tell metamask to prompt user to approve switch to Binance Smart Chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexValue(smartChainID) }],
    });
  };

  return (
    <div className="flex flex-wrap place-content-center">
      {walletState.network !== 56 ? (
        <div className="w-full lg:w-2/3 p-6">
          <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-pink-600">
                  <i className="fa fa-link fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Network Status
                </h2>
                <p className="font-bold text-xs xl:text-xl">
                  {walletState.network === 56 ? (
                    `You are connected to the Smart Chain with ID#
                      ${walletState.network}`
                  ) : (
                    <button href="#" onClick={promptSwitchToSmartChain}>
                      You are not connected to the Smart Chain. Click here to
                      switch networks. [ChainID: {walletState.network}]
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-2/3 p-6">
          <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-green-600">
                  <i className="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Wallet Address
                </h2>
                <p className="font-bold text-xs xl:text-xl ">
                  {!walletState.currentAccount
                    ? "Please Connect Wallet"
                    : walletState.currentAccount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
