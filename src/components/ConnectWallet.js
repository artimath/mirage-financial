import React from "react";

export const ConnectWallet = (props) => {
  const { currentAccount, connectWallet, disconnectWallet } = props;
  return (
    <div>
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
    </div>
  );
};

export default ConnectWallet;
