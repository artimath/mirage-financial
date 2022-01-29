import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../contexts/WalletContext";

import { doc, getDoc } from "firebase/firestore";
import { GUARDBUSD_AC_ADDRESS } from "../contracts/utils/GuardBUSD-AC-Contract";
import { firestore } from "../firebase";
import { DateTime } from "luxon";

const VaultHistory = (props) => {
  const [walletState] = useContext(WalletContext);
  const [balanceData, setBalanceData] = useState([]);
  console.log("Wallet State: ", walletState.currentAccount);

  const get_historical_data = async () => {
    const vaultRef = doc(
      firestore,
      `users/${walletState.currentAccount}/vault_holdings`,
      GUARDBUSD_AC_ADDRESS
    );

    console.log(vaultRef);

    const vaultSnap = await getDoc(vaultRef);

    if (vaultSnap.exists()) {
      console.log("Vaultsnap data2: ", vaultSnap.data());
      console.log("Balance Data2: ", vaultSnap.data().balanceData);
      setBalanceData(vaultSnap.data().balanceData);
    } else {
      if (props.balanceData) {
        setBalanceData(props.historicalData);
      } else {
        setBalanceData([
          {
            date: "01/25/1995",
            balance: "192.32",
          },
        ]);
      }

      console.log(balanceData);
    }
    return null;
  };

  // console.log("Props: ", props.historicalData);

  useEffect(() => {
    // Call on first render
    get_historical_data();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletState.currentAccount]);

  return (
    <div>
      <h1 data-testid="headline">Vault History</h1>
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table
                className="divide-y divide-gray-300 "
                data-testid="vault-history-table"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Vault Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {balanceData &&
                    balanceData.map((dateData) => {
                      return (
                        <tr className="whitespace-nowrap">
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {DateTime.fromJSDate(
                                dateData.date.toDate()
                              ).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            ${dateData.balance}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultHistory;
