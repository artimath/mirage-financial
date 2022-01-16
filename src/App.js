import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ConnectWallet } from "./components/ConnectWallet";
import AccountInfo from "./components/AccountInfo";
import CompounderAccountData from "./components/CompounderAccountData";
import { ethers } from "ethers";
import {
  GUARDBUSD_AC_ABI,
  GUARDBUSD_AC_ADDRESS,
} from "./contracts/utils/GuardBUSD-AC-Contract";
import { hexValue } from "ethers/lib/utils";
import { faGopuram } from "@fortawesome/free-solid-svg-icons";

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
    <div className="App bg-gray-800 font-sans leading-normal tracking-normal mt-9 ">
      <header>
        <nav className=" bg-gray-700 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 text-white ">
          <div className=" flex flex-wrap items-center ">
            <div className="flex flex-shrink w-1/2 md:w-1/3 justify-start text-white ">
              <a href="/" aria-label="Home">
                <span className=" text-xl pl-2">
                  <FontAwesomeIcon icon={faGopuram} />
                </span>
              </a>
            </div>
            <div className="md:flex md:flex-shrink hidden w-1/2 md:w-1/3 justify-center">
              <h1>initiated.finance</h1>
            </div>
            <div className="flex flex-shrink w-1/2 md:w-1/3 justify-end">
              <ConnectWallet
                currentAccount={currentAccount}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
              />
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="flex flex-col md:flex-row">
          <nav aria-label="alternative nav">
            <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
              <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                  <li className="mr-3 flex-1">
                    <a
                      href="/"
                      className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                    >
                      <span className="pr-0 md:pr-3">
                        <FontAwesomeIcon icon={faGopuram} />
                      </span>
                      <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                        The Tower
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <section className="w-full">
            <div
              id="main"
              className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 font-black"
            >
              <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                  <h1 class="font-bold pl-2">Tower</h1>
                </div>
              </div>

              <AccountInfo
                currentAccount={currentAccount}
                currentNetwork={currentNetwork}
                connectWallet={connectWallet}
                promptSwitchToSmartChain={promptSwitchToSmartChain}
              />
              {/* <div className="px-6 pt-6">
                <div className="border-b-4 border-blue-300">
                  <h1 className=" text-2xl">Guard/BUSD Vault</h1>
                </div>
              </div> */}
              {currentAccount && (
                <CompounderAccountData
                  contract={guardBusdContract}
                  walletAddress={currentAccount}
                  provider={provider}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
