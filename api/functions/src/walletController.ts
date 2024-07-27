import { Response } from "express";
import { db } from "./config/firebase";
import { makeAddressReadable } from "./utilities";

type WalletType = {
  address: string;
  addressReadable: string;
};

type Request = {
  body: WalletType;
  params: { walletAddress: string };
};

/**
 * Convert unknown error message objects into string
 * @param  {unknown} error
 * @return {string} error
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

const getWallet = async (req: Request, res: Response) => {
  const { walletAddress } = req.params;

  const shortenedAddress = makeAddressReadable(walletAddress);

  try {
    const walletRef = db.collection("users").doc(walletAddress);
    const walletSnap = await walletRef.get();

    if (walletSnap.exists) {
      // update last_updated

      const updateWalletObject = {
        last_updated: Date.now(),
      };

      await walletRef.update(updateWalletObject);

      res.status(200).send({
        status: "success",
        message: "wallet added successfully",
        data: { shortenedAddress: shortenedAddress, ...updateWalletObject },
      });
    } else {
      // create new wallet

      const newWalletObject = {
        address: walletAddress,
        address_readable: shortenedAddress,
        last_updated: Date.now(),
        first_created: Date.now(),
      };

      await walletRef.set(newWalletObject);

      res.status(200).send({
        status: "success",
        message: "wallet added successfully",
        data: { shortenedAddress: shortenedAddress, ...newWalletObject },
      });
    }
  } catch (error) {
    res.status(500).json(getErrorMessage(error));
  }
};

// const addWallet = async (req: Request, res: Response): Promise<void> => {
//   const { address } = req.body;
//   try {
//     const wallet = db.collection("users").doc(address);
//     const walletObject = {
//       address: address,
//       last_updated: Date.now(),
//       first_created: Date.now(),
//     };

//     wallet.set(walletObject);

//     res.status(200).send({
//       status: "success",
//       message: "wallet added successfully",
//       data: walletObject,
//     });
//   } catch (error) {
//     res.status(500).json(getErrorMessage(error));
//   }
// };

// const getAllWallets = async (req: Request, res: Response) => {
//   try {
//     const allWallets: WalletType[] = [];
//     const querySnapshot = await db.collection("users").get();
//     querySnapshot.forEach((doc: any) => {
//       allWallets.push({ id: doc.id, ...doc.data() });
//     });
//     return res.status(200).json(allWallets);
//   } catch (error) {
//     return res.status(500).json(getErrorMessage(error));
//   }
// };

// const updateWallet = async (req: Request, res: Response) => {
//   const {
//     body: { address },
//     params: { walletAddress },
//   } = req;

//   try {
//     const wallet = db.collection("users").doc(walletAddress);
//     const currentData = (await wallet.get()).data() || {};
//     const walletObject = {
//       address: address || currentData.address,
//       lastUpdated: Date.now(),
//     };

//     await wallet.set(walletObject).catch((error) => {
//       return res.status(400).json({
//         status: "error",
//         message: getErrorMessage(error),
//       });
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "wallet updated successfully",
//       data: walletObject,
//     });
//   } catch (error) {
//     return res.status(500).json(getErrorMessage(error));
//     10;
//   }
// };

// const deleteWallet = async (req: Request, res: Response) => {
//   const { walletAddress } = req.params;

//   try {
//     const wallet = db.collection("users").doc(walletAddress);

//     await wallet.delete().catch((error) => {
//       return res.status(400).json({
//         status: "error",
//         message: error.message,
//       });
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "entry deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json(getErrorMessage(error));
//   }
// };

export { getWallet };
