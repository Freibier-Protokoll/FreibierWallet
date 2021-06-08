import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

import { useSelector } from 'react-redux'
import TokenCell from '../token-cell'
import { useI18nContext } from '../../../hooks/useI18nContext'
import { useTokenTracker } from '../../../hooks/useTokenTracker'
import { getAssetImages } from '../../../selectors'
import { getTokens } from '../../../ducks/metamask/metamask'
import console from 'console'
import { FREIBIER_TOKEN_IMAGE_URL } from '../../../../../shared/constants/network'

export default function TokenList({ onTokenClick }) {
  const t = useI18nContext()
  const assetImages = useSelector(getAssetImages)
  // use `isEqual` comparison function because the token array is serialized
  // from the background so it has a new reference with each background update,
  // even if the tokens haven't changed
  const tokens = useSelector(getTokens, isEqual)
  let freibier = {
    address: '0x26046abedf7117af40ca645350eb857d170bf71f',
    symbol: 'Freibier',
    decimals: '0',
  }
  let contains = false
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].address === freibier.address) {
      contains = true
    }
  }
  if (!contains) {
    tokens.push(freibier)
  }
  assetImages[freibier.address] = FREIBIER_TOKEN_IMAGE_URL
  const { loading, tokensWithBalances } = useTokenTracker(tokens, true)
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '250px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        {t('loadingTokens')}
      </div>
    )
  }

  return (
    <div>
      {tokensWithBalances.map((tokenData, index) => {
        tokenData.image = assetImages[tokenData.address]
        return <TokenCell key={index} {...tokenData} onClick={onTokenClick} />
      })}
    </div>
  )
}

TokenList.propTypes = {
  onTokenClick: PropTypes.func.isRequired,
}
