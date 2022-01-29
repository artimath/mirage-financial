import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  faChartLine,
  faEye,
  faGopuram,
} from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";

import { ConnectWallet } from "./components/ConnectWallet";

import { WalletContext } from "./contexts/WalletContext";

const App = () => {
  const [walletState, setWalletState] = useContext(WalletContext);

  // Define the guardBUSD vault contract as an object

  // Log updated chain and add to state
  window.ethereum.on("chainChanged", (chainID) => {
    setWalletState({ network: Number(chainID) });
    console.log("Network Changed", Number(chainID));
  });

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
        setWalletState({ currentAccount: account });
      } else {
        console.log("Not authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurrentNetwork = async (provider) => {
    // Takes the metamask RPC endpoint provider object as parameter
    // Asks metamask for the current network id, saves it to state.
    const { chainId } = await provider.getNetwork();
    setWalletState((state) => ({ ...state, network: Number(chainId) }));
  };
  useEffect(() => {
    // Run once on first render
    checkIfWalletIsConnected();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Run when current account changes
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // update provider if it's changed
    setWalletState((state) => ({ ...state, provider: provider }));

    // update network if changed
    updateCurrentNetwork(provider);
  }, [walletState.currentAccount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App bg-gray-800 font-sans leading-normal tracking-normal mt-9 ">
      <header>
        <nav className=" bg-gray-700 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 text-white ">
          <div className=" flex flex-wrap items-center ">
            <div className="flex flex-shrink w-1/2 md:w-1/3 justify-start text-white ">
              <Link to="/" aria-label="Home">
                <span className=" text-xl pl-2">
                  <FontAwesomeIcon icon={faGopuram} />
                </span>
              </Link>
            </div>
            <div className="md:flex md:flex-shrink hidden w-1/2 md:w-1/3 justify-center">
              <h1>initiated.finance</h1>
            </div>
            <div className="flex flex-shrink w-1/2 md:w-1/3 justify-end">
              <ConnectWallet />
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
                    <NavLink
                      to="/"
                      className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                    >
                      <span className="pr-0 md:pr-3">
                        <FontAwesomeIcon icon={faGopuram} size="2x" />
                      </span>
                      <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                        Home
                      </span>
                    </NavLink>
                    <NavLink
                      to="/portfolio"
                      className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                    >
                      <span className="pr-0 md:pr-3">
                        <FontAwesomeIcon icon={faEye} size="2x" />
                      </span>
                      <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                        Portfolio
                      </span>
                    </NavLink>
                    <NavLink
                      to="/vault-history"
                      className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                    >
                      <span className="pr-0 md:pr-3">
                        <FontAwesomeIcon icon={faChartLine} size="2x" />
                      </span>
                      <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                        History
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <section className="w-full">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
