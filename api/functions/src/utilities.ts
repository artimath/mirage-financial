/**
 * Takes in a standard Ethereum address as string.
 *
 * Returns readable address in the form of 0x12...abcd
 *
 * @param  {string} accountAddress
 * @return {string}
 */
const makeAddressReadable = (accountAddress: string): string => {
  const firstFour = accountAddress.slice(0, 4);
  const lastFour = accountAddress.slice(-5, -1);
  const readableAddress = firstFour + "..." + lastFour;
  return readableAddress;
};

export { makeAddressReadable };
