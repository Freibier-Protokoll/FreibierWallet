import { useSelector } from 'react-redux'
import {
  getPreferences,
  getShouldShowFiat,
  getNativeCurrency,
  getTicker,
} from '../selectors'
import { PRIMARY, SECONDARY, ETH } from '../helpers/constants/common'
import { BNB_SYMBOL } from '../../../shared/constants/network'
import console from 'console'

/**
 * Defines the shape of the options parameter for useUserPreferencedCurrency
 * @typedef {Object} UseUserPreferencedCurrencyOptions
 * @property {number} [numberOfDecimals]     - Number of significant decimals to display
 * @property {number} [ethNumberOfDecimals]  - Number of significant decimals to display
 *                                             when using ETH
 * @property {number} [fiatNumberOfDecimals] - Number of significant decimals to display
 *                                            when using fiat
 */

/**
 * Defines the return shape of useUserPreferencedCurrency
 * @typedef {Object} UserPreferredCurrency
 * @property {string} currency         - the currency type to use (eg: 'ETH', 'usd')
 * @property {number} numberOfDecimals - Number of significant decimals to display
 */

/**
 * useUserPreferencedCurrency
 *
 * returns an object that contains what currency to use for displaying values based
 * on the user's preference settings, as well as the significant number of decimals
 * to display based on the currency
 * @param {"PRIMARY" | "SECONDARY"} type - what display type is being rendered
 * @param {UseUserPreferencedCurrencyOptions} opts - options to override default values
 * @return {UserPreferredCurrency}
 */
export function useUserPreferencedCurrency(type, opts = {}) {
  const nativeCurrency = useSelector(getNativeCurrency)
  const ticker = useSelector(getTicker)
  const { useNativeCurrencyAsPrimaryCurrency } = useSelector(getPreferences)
  const showFiat = useSelector(getShouldShowFiat)
  console.log('Native: ', nativeCurrency)
  let currency, numberOfDecimals
  if (
    !showFiat ||
    (type === PRIMARY && useNativeCurrencyAsPrimaryCurrency) ||
    (type === SECONDARY && !useNativeCurrencyAsPrimaryCurrency)
  ) {
    // Display ETH
    if (nativeCurrency === BNB_SYMBOL) {
      currency = nativeCurrency
    } else {
      currency = nativeCurrency || ETH
    }
    numberOfDecimals = opts.numberOfDecimals || opts.ethNumberOfDecimals || 6
  } else if (
    (type === SECONDARY && useNativeCurrencyAsPrimaryCurrency) ||
    (type === PRIMARY && !useNativeCurrencyAsPrimaryCurrency)
  ) {
    // Display Fiat
    numberOfDecimals = opts.numberOfDecimals || opts.fiatNumberOfDecimals || 2
  }
  console.log(currency)
  return { currency, numberOfDecimals }
}
