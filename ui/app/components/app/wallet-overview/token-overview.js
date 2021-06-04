import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Identicon from '../../ui/identicon'
import CurrencyDisplay from '../../ui/currency-display'
import { I18nContext } from '../../../contexts/i18n'
import {
  SEND_ROUTE,
} from '../../../helpers/constants/routes'
import {
  useMetricEvent,
} from '../../../hooks/useMetricEvent'
import { useTokenTracker } from '../../../hooks/useTokenTracker'
import { useTokenFiatAmount } from '../../../hooks/useTokenFiatAmount'
import { updateSendToken } from '../../../store/actions'
import {
  getAssetImages,
  getCurrentKeyring,
} from '../../../selectors/selectors'

import SendIcon from '../../ui/icon/overview-send-icon.component'

import IconButton from '../../ui/icon-button'
import WalletOverview from './wallet-overview'

const TokenOverview = ({ className, token }) => {
  const dispatch = useDispatch()
  const t = useContext(I18nContext)
  const sendTokenEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Send: Token',
    },
  })
  const history = useHistory()
  const assetImages = useSelector(getAssetImages)

  const keyring = useSelector(getCurrentKeyring)
  const { tokensWithBalances } = useTokenTracker([token])
  const balanceToRender = tokensWithBalances[0]?.string
  const formattedFiatBalance = useTokenFiatAmount(
    token.address,
    balanceToRender,
    token.symbol,
  )

  return (
    <WalletOverview
      balance={
        <div className="token-overview__balance">
          <CurrencyDisplay
            className="token-overview__primary-balance"
            displayValue={balanceToRender}
            suffix={token.symbol}
          />
          {formattedFiatBalance ? (
            <CurrencyDisplay
              className="token-overview__secondary-balance"
              displayValue={formattedFiatBalance}
              hideLabel
            />
          ) : null}
        </div>
      }
      buttons={
        <>
          <IconButton
            className="token-overview__button"
            onClick={() => {
              sendTokenEvent()
              dispatch(updateSendToken(token))
              history.push(SEND_ROUTE)
            }}
            Icon={SendIcon}
            label={t('send')}
            data-testid="eth-overview-send"
          />
        </>
      }
      className={className}
      icon={
        <Identicon
          diameter={32}
          address={token.address}
          image={assetImages[token.address]}
        />
      }
    />
  )
}

TokenOverview.propTypes = {
  className: PropTypes.string,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number,
    symbol: PropTypes.string,
  }).isRequired,
}

TokenOverview.defaultProps = {
  className: undefined,
}

export default TokenOverview
