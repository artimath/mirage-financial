import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useCallback } from "react";

import { WalletContext } from "../contexts/WalletContext";

export const ConnectWallet = () => {
  const [walletState, setWalletState] = useContext(WalletContext);

  const onClick = useCallback(() => {
    const connectWallet = async () => {
      // check if metamask is providing the ethereum object
      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        } else {
          // request a list of connected accounts from metamask
          // if no wallet connected, metamask prompts browser to connect
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // Ping database to see if wallet is created or not.
          try {
            const response = await fetch(
              `http://localhost:5001/if-tower-staging/us-central1/app/user_wallets/${accounts[0]}`
            );

            const json = await response.json;

            console.log(json);
          } catch (error) {
            console.error(error);
          }

          setWalletState((state) => ({
            ...state,
            currentAccount: accounts[0],
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const disconnectWallet = async () => {
      // Psuedo discconect. Just removes the current account from the active state
      setWalletState((state) => ({
        ...state,
        currentAccount: "",
      }));
    };

    !walletState.currentAccount ? connectWallet() : disconnectWallet();
  }, [walletState.currentAccount, setWalletState]);

  return (
    <div className="inline">
      <button
        className={`connectButton
        ${!walletState.currentAccount ? "disconnected" : "connected"}`}
        onClick={onClick}
      >
        <span className="pr-2">
          <FontAwesomeIcon icon={faWallet} />
        </span>
        {`${
          !walletState.currentAccount ? "Connect Wallet" : "Disconnect Wallet"
        }`}
      </button>
    </div>
  );
};

export default ConnectWallet;
