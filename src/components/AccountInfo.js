import React from "react";

const AccountInfo = (props) => {
  const { currentAccount, currentNetwork, promptSwitchToSmartChain } = props;
  return (
    <div>
      {/* Render different notification based on current connected chainID */}
      <p>Your account is: {currentAccount}</p>;
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
      ;
    </div>
  );
};

export default AccountInfo;
