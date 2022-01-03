import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  GUARDBUSD_AC_ABI,
  GUARDBUSD_AC_ADDRESS,
} from "./contracts/utils/GuardBUSD-AC-Contract";
import "./App.css";
import { hexValue } from "ethers/lib/utils";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [balance, setBalance] = useState();
  const [currentNetwork, setCurrentNetwork] = useState();
  const [provider, setProvider] = useState();
  const smartChainID = 56;

  const checkIfWalletIsConnected = async () => {
    // Make sure we have access to window.ethereum

    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object.");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("Not authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    setCurrentAccount("");
  };

  const updateCurrentNetwork = async (provider) => {
    const { chainId } = await provider.getNetwork();
    setCurrentNetwork(chainId);
  };

  const promptSwitchToSmartChain = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexValue(smartChainID) }],
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    updateCurrentNetwork(provider);
  }, [currentAccount, setCurrentAccount]);

  window.ethereum.on("chainChanged", (chainID) => {
    setCurrentNetwork(Number(chainID));
    console.log("Network Changed", Number(chainID));
    console.log(hexValue(chainID));
  });

  return (
    <div className="App">
      <h1>Kings Armory</h1>
      {/* {If there is no currentAccont render this button} */}
      {!currentAccount ? (
        <button className="connectButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button className="connectButton connected" onClick={disconnectWallet}>
          Disconnect Wallet
        </button>
      )}
      {/* {Render different notification based on current connected chainID} */}
      <p>Your account is: {currentAccount}</p>
      {currentNetwork === 56 ? (
        <p>You are connected to the Smart Chain with ID# {currentNetwork}</p>
      ) : (
        <p>
          You are not connected to the Smart Chain. Click
          <button href="#" onClick={promptSwitchToSmartChain}>
            <span> here </span>
          </button>
          to switch networks. [ChainID: {currentNetwork}]
        </p>
      )}
    </div>
  );
};

export default App;
