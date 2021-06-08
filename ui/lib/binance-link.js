import { BINANCE_MAINNET_NETWORK_ID } from '../../app/scripts/controllers/network/enums'

export default function getBinanceLink(address, network) {
  if (network === BINANCE_MAINNET_NETWORK_ID) {
    return `https://www.bscscan.com/address/${address}`
  } else {
    return `https://testnet.bscscan.com/address/${address}`
  }
}
