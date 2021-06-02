export const ROPSTEN = 'ropsten'
export const RINKEBY = 'rinkeby'
export const KOVAN = 'kovan'
export const MAINNET = 'mainnet'
export const GOERLI = 'goerli'
export const BINANCE_MAINNET = 'binanceMainnet'
export const BINANCE_TESTNET = 'binanceTestnet'

export const MAINNET_NETWORK_ID = '1'
export const ROPSTEN_NETWORK_ID = '3'
export const RINKEBY_NETWORK_ID = '4'
export const GOERLI_NETWORK_ID = '5'
export const KOVAN_NETWORK_ID = '42'
export const BINANCE_MAINNET_NETWORK_ID = '55'
export const BINANCE_TESTNET_NETWORK_ID = '56'

export const MAINNET_CHAIN_ID = '0x1'
export const ROPSTEN_CHAIN_ID = '0x3'
export const RINKEBY_CHAIN_ID = '0x4'
export const GOERLI_CHAIN_ID = '0x5'
export const KOVAN_CHAIN_ID = '0x2a'
export const BINANCE_MAINNET_CHAIN_ID = '0x38'
export const BINANCE_TESTNET_CHAIN_ID = '0x61'

export const ROPSTEN_DISPLAY_NAME = 'Ropsten'
export const RINKEBY_DISPLAY_NAME = 'Rinkeby'
export const KOVAN_DISPLAY_NAME = 'Kovan'
export const MAINNET_DISPLAY_NAME = 'Ethereum Mainnet'
export const GOERLI_DISPLAY_NAME = 'Goerli'
export const BINANCE_MAINNET_DISPLAY_NAME = 'Binance Mainnet'
export const BINANCE_TESTNET_DISPLAY_NAME = 'Binance Testnet'

export const BINANCE_MAINNET_RPCURL = 'https://bsc-dataseed.binance.org/'
export const BINANCE_TESTNET_RPCURL =
  'https://data-seed-prebsc-1-s1.binance.org:8545/'

export const INFURA_PROVIDER_TYPES = [ROPSTEN, RINKEBY, KOVAN, MAINNET, GOERLI]
export const BINANCE_PROVIDER_TYPES = [BINANCE_MAINNET, BINANCE_TESTNET]
export const BINANCE_NETWORK_IDS = [
  BINANCE_MAINNET_NETWORK_ID,
  BINANCE_TESTNET_NETWORK_ID,
]

export const NETWORK_TYPE_TO_ID_MAP = {
  [BINANCE_MAINNET]: {
    networkId: BINANCE_MAINNET_NETWORK_ID,
    chainId: BINANCE_MAINNET_CHAIN_ID,
  },
  [BINANCE_TESTNET]: {
    networkId: BINANCE_TESTNET_NETWORK_ID,
    chainId: BINANCE_TESTNET_CHAIN_ID,
  },
  [ROPSTEN]: { networkId: ROPSTEN_NETWORK_ID, chainId: ROPSTEN_CHAIN_ID },
  [RINKEBY]: { networkId: RINKEBY_NETWORK_ID, chainId: RINKEBY_CHAIN_ID },
  [KOVAN]: { networkId: KOVAN_NETWORK_ID, chainId: KOVAN_CHAIN_ID },
  [GOERLI]: { networkId: GOERLI_NETWORK_ID, chainId: GOERLI_CHAIN_ID },
  [MAINNET]: { networkId: MAINNET_NETWORK_ID, chainId: MAINNET_CHAIN_ID },
}

export const NETWORK_TO_NAME_MAP = {
  [BINANCE_MAINNET]: BINANCE_MAINNET_DISPLAY_NAME,
  [BINANCE_TESTNET]: BINANCE_TESTNET_DISPLAY_NAME,
  [ROPSTEN]: ROPSTEN_DISPLAY_NAME,
  [RINKEBY]: RINKEBY_DISPLAY_NAME,
  [KOVAN]: KOVAN_DISPLAY_NAME,
  [MAINNET]: MAINNET_DISPLAY_NAME,
  [GOERLI]: GOERLI_DISPLAY_NAME,

  [BINANCE_MAINNET_NETWORK_ID]: BINANCE_MAINNET_DISPLAY_NAME,
  [BINANCE_TESTNET_NETWORK_ID]: BINANCE_TESTNET_DISPLAY_NAME,
  [ROPSTEN_NETWORK_ID]: ROPSTEN_DISPLAY_NAME,
  [RINKEBY_NETWORK_ID]: RINKEBY_DISPLAY_NAME,
  [KOVAN_NETWORK_ID]: KOVAN_DISPLAY_NAME,
  [GOERLI_NETWORK_ID]: GOERLI_DISPLAY_NAME,
  [MAINNET_NETWORK_ID]: MAINNET_DISPLAY_NAME,

  [BINANCE_MAINNET_CHAIN_ID]: BINANCE_MAINNET_DISPLAY_NAME,
  [BINANCE_TESTNET_CHAIN_ID]: BINANCE_TESTNET_DISPLAY_NAME,
  [ROPSTEN_CHAIN_ID]: ROPSTEN_DISPLAY_NAME,
  [RINKEBY_CHAIN_ID]: RINKEBY_DISPLAY_NAME,
  [KOVAN_CHAIN_ID]: KOVAN_DISPLAY_NAME,
  [GOERLI_CHAIN_ID]: GOERLI_DISPLAY_NAME,
  [MAINNET_CHAIN_ID]: MAINNET_DISPLAY_NAME,
}

export const CHAIN_ID_TO_TYPE_MAP = Object.entries(
  NETWORK_TYPE_TO_ID_MAP,
).reduce((chainIdToTypeMap, [networkType, { chainId }]) => {
  chainIdToTypeMap[chainId] = networkType
  return chainIdToTypeMap
}, {})

export const CHAIN_ID_TO_NETWORK_ID_MAP = Object.values(
  NETWORK_TYPE_TO_ID_MAP,
).reduce((chainIdToNetworkIdMap, { chainId, networkId }) => {
  chainIdToNetworkIdMap[chainId] = networkId
  return chainIdToNetworkIdMap
}, {})
