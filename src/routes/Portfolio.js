import React, { useContext } from "react";
import AccountInfo from "../components/AccountInfo";
import CompounderAccountData from "../components/CompounderAccountData";
import { WalletContext } from "../contexts/WalletContext";

const Portfolio = () => {
  const [walletState] = useContext(WalletContext);

  return (
    <div
      id="main"
      className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 font-black"
    >
      <div className="bg-gray-800 pt-3">
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <h1 className="font-bold pl-2">Portfolio</h1>
        </div>
      </div>

      <AccountInfo />
      {/* <div className="px-6 pt-6">
                <div className="border-b-4 border-blue-300">
                  <h1 className=" text-2xl">Guard/BUSD Vault</h1>
                </div>
              </div> */}
      {walletState.currentAccount && <CompounderAccountData />}
    </div>
  );
};

export default Portfolio;
