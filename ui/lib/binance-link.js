export default function getBinanceLink(network, address) {
  if (network === 55) {
    return `https://www.bscscan.com/address/${address}`
  } else {
    return `https://testnet.bscscan.com/address/${address}`
  }
}
