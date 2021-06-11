import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageContainerHeader from '../../../components/ui/page-container/page-container-header'
import { BINANCE_NETWORK_IDS } from '../../../../../app/scripts/controllers/network/enums'

export default class SendHeader extends Component {
  static propTypes = {
    clearSend: PropTypes.func,
    history: PropTypes.object,
    mostRecentOverviewPage: PropTypes.string,
    titleKey: PropTypes.string,
    network: PropTypes.string,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  onClose() {
    const { clearSend, history, mostRecentOverviewPage } = this.props
    clearSend()
    history.push(mostRecentOverviewPage)
  }

  render() {
    const { network } = this.props
    const isBinance = BINANCE_NETWORK_IDS.includes(network)
    let title = ''
    if (isBinance && this.props.titleKey === 'sendETH') {
      title = 'Send BNB'
    } else {
      title = this.context.t(this.props.titleKey)
    }

    return (
      <PageContainerHeader
        className="send__header"
        onClose={() => this.onClose()}
        title={title}
        headerCloseText={this.context.t('cancel')}
      />
    )
  }
}
