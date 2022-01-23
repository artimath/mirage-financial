import { createContext, useState } from "react";

const WalletContext = createContext([{}, () => {}]);

const WalletProvider = (props) => {
  const [walletState, setWalletState] = useState({});

  return (
    <WalletContext.Provider value={[walletState, setWalletState]}>
      {props.children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
