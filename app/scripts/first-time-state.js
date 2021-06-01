/**
 * @typedef {Object} FirstTimeState
 * @property {Object} config Initial configuration parameters
 * @property {Object} NetworkController Network controller state
 */

/**
 * @type {FirstTimeState}
 */
const initialState = {
  config: {},
  PreferencesController: {
    frequentRpcListDetail: [
      {
        rpcUrl: 'http://localhost:8545',
        chainId: '0x539',
        ticker: 'ETH',
        nickname: 'Localhost 8545',
        rpcPrefs: {},
      },
      {
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        chainId: '0x61',
        ticker: 'BNB',
        nickname: 'Binance Testnet',
        rpcPrefs: {},
      },
      {
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        chainId: '0x38',
        ticker: 'BNB',
        nickname: 'Binance Mainnet',
        rpcPrefs: {},
      }
    ],
  },
}

export default initialState
