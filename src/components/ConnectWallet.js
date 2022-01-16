import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCallback } from "react";

export const ConnectWallet = (props) => {
  const { currentAccount, connectWallet, disconnectWallet } = props;

  const onClick = useCallback(() => {
    !currentAccount ? connectWallet() : disconnectWallet();
  }, [connectWallet, currentAccount, disconnectWallet]);
  return (
    <div className="inline">
      <button
        className={`connectButton
        ${!currentAccount ? "disconnected" : "connected"}`}
        onClick={onClick}
      >
        <span className="pr-2">
          <FontAwesomeIcon icon={faWallet} />
        </span>
        {`${!currentAccount ? "Connect Wallet" : "Disconnect Wallet"}`}
      </button>
    </div>
  );
};

export default ConnectWallet;
