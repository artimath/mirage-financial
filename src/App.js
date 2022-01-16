import { useEffect, useState } from "react";
import { ConnectWallet } from "./components/ConnectWallet";
import AccountInfo from "./components/AccountInfo";
import CompounderAccountData from "./components/CompounderAccountData";
import { ethers } from "ethers";
import {
  GUARDBUSD_AC_ABI,
  GUARDBUSD_AC_ADDRESS,
} from "./contracts/utils/GuardBUSD-AC-Contract";
import { hexValue } from "ethers/lib/utils";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [currentNetwork, setCurrentNetwork] = useState();
  const [provider, setProvider] = useState();
  const smartChainID = 56; // Binance smart chain

  // Define the guardBUSD vault contract as an object
  const guardBusdContract = new ethers.Contract(
    GUARDBUSD_AC_ADDRESS,
    GUARDBUSD_AC_ABI,
    provider
  );

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
      // request a list of connected accounts from metamask
      // if no wallet connected, metamask prompts browser to connect
      const accounts = await ethereum.request({ method: "eth_accounts" });

      // if any accounts found, log to console and set account to component state
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

        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    // Psuedo discconect. Just removes the current account from the active state
    setCurrentAccount("");
  };

  const updateCurrentNetwork = async (provider) => {
    // Takes the metamask RPC endpoint provider object as parameter
    // Asks metamask for the current network id, saves it to state.
    const { chainId } = await provider.getNetwork();
    setCurrentNetwork(chainId);
  };

  const promptSwitchToSmartChain = async () => {
    // Tell metamask to prompt user to approve switch to Binance Smart Chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexValue(smartChainID) }],
    });
  };

  // Log updated chain and add to state
  window.ethereum.on("chainChanged", (chainID) => {
    setCurrentNetwork(Number(chainID));
    console.log("Network Changed", Number(chainID));
    console.log(hexValue(chainID));
  });

  useEffect(() => {
    // Run once on first render
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    // Run when current account changes

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // update provider if it's changed
    setProvider(provider);
    // update network if changed
    updateCurrentNetwork(provider);
  }, [currentAccount, setCurrentAccount]);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Initiated Finance: Tower</h1>

      <ConnectWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
      <hr />
      <AccountInfo
        currentAccount={currentAccount}
        currentNetwork={currentNetwork}
        promptSwitchToSmartChain={promptSwitchToSmartChain}
      />
      <hr />
      <CompounderAccountData
        contract={guardBusdContract}
        walletAddress={currentAccount}
        provider={provider}
      />
    </div>
  );
};

export default App;
