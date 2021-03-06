import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class MetaFoxLogo extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    unsetIconHeight: PropTypes.bool,
  }

  static defaultProps = {
    onClick: undefined,
  }

  render() {
    const { onClick, unsetIconHeight } = this.props
    const iconProps = unsetIconHeight ? {} : { height: 42, width: 42 }

    return (
      <div
        onClick={onClick}
        className={classnames('app-header__logo-container', {
          'app-header__logo-container--clickable': Boolean(onClick),
        })}
      >
        <img
          height="40"
          src="/images/logo/freibier-logo.png"
          className={classnames(
            'app-header__metafox-logo',
            'app-header__metafox-logo--horizontal',
          )}
          alt="freibier-logo"
        />
        <img
          {...iconProps}
          src="/images/logo/freibier-logo.png"
          className={classnames(
            'app-header__metafox-logo',
            'app-header__metafox-logo--icon',
          )}
          alt="freibier-logo"
        />
      </div>
    )
  }
}
