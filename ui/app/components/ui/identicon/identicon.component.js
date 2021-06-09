import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import contractMap from '@metamask/contract-metadata'

import { checksumAddress } from '../../../helpers/utils/util'
import Jazzicon from '../jazzicon'
import BlockieIdenticon from './blockieIdenticon'
import { BINANCE_NETWORK_IDS } from '../../../../../app/scripts/controllers/network/enums'

const getStyles = (diameter) => ({
  height: diameter,
  width: diameter,
  borderRadius: diameter / 2,
})

export default class Identicon extends PureComponent {
  static propTypes = {
    addBorder: PropTypes.bool,
    address: PropTypes.string,
    className: PropTypes.string,
    diameter: PropTypes.number,
    image: PropTypes.string,
    useBlockie: PropTypes.bool,
    alt: PropTypes.string,
    network: PropTypes.string,
  }

  static defaultProps = {
    addBorder: false,
    address: undefined,
    className: undefined,
    diameter: 46,
    image: undefined,
    useBlockie: false,
    alt: '',
  }

  renderImage() {
    const { className, diameter, image, alt } = this.props

    return (
      <img
        className={classnames('identicon', className)}
        src={image}
        style={getStyles(diameter)}
        alt={alt}
      />
    )
  }

  renderJazzicon() {
    const { address, className, diameter, alt } = this.props

    return (
      <Jazzicon
        address={address}
        diameter={diameter}
        className={classnames('identicon', className)}
        style={getStyles(diameter)}
        alt={alt}
      />
    )
  }

  renderBlockie() {
    const { address, className, diameter, alt } = this.props

    return (
      <div
        className={classnames('identicon', className)}
        style={getStyles(diameter)}
      >
        <BlockieIdenticon address={address} diameter={diameter} alt={alt} />
      </div>
    )
  }

  render() {
    const {
      className,
      address,
      image,
      diameter,
      useBlockie,
      addBorder,
      alt,
      network,
    } = this.props

    const isBinance = BINANCE_NETWORK_IDS.includes(network)

    if (image) {
      return this.renderImage()
    }

    if (address) {
      const checksummedAddress = checksumAddress(address)

      if (contractMap[checksummedAddress]?.logo) {
        return this.renderJazzicon()
      }

      return (
        <div
          className={classnames({ 'identicon__address-wrapper': addBorder })}
        >
          {useBlockie ? this.renderBlockie() : this.renderJazzicon()}
        </div>
      )
    }

    return (
      <img
        className={classnames('identicon__eth-logo', className)}
        src={isBinance ? './images/bnb-logo.png' : './images/eth_logo.svg'}
        style={getStyles(diameter)}
        alt={alt}
      />
    )
  }
}
