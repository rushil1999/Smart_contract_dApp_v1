import Web3 from "web3"

export const convertEthToWei = (eth) => {
  const value = Web3.utils.toWei(eth, 'ether');
  return value;
}

export const converWeiToEth = (wei) => {
  const value = Web3.utils.fromWei(wei, 'ether');
  return value;
}