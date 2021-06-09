import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/ui/button'
import Snackbar from '../../../components/ui/snackbar'
import MetaFoxLogo from '../../../components/ui/metafox-logo'
import { DEFAULT_ROUTE } from '../../../helpers/constants/routes'
import { returnToOnboardingInitiator } from '../onboarding-initiator-util'

export default class EndOfFlowScreen extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  }

  static propTypes = {
    history: PropTypes.object,
    completionMetaMetricsName: PropTypes.string,
    setCompletedOnboarding: PropTypes.func,
    onboardingInitiator: PropTypes.exact({
      location: PropTypes.string,
      tabId: PropTypes.number,
    }),
  }

  async _beforeUnload() {
    await this._onOnboardingComplete()
  }

  _removeBeforeUnload() {
    window.removeEventListener('beforeunload', this._beforeUnload)
  }

  async _onOnboardingComplete() {
    const { setCompletedOnboarding, completionMetaMetricsName } = this.props
    await setCompletedOnboarding()
    this.context.metricsEvent({
      eventOpts: {
        category: 'Onboarding',
        action: 'Onboarding Complete',
        name: completionMetaMetricsName,
      },
    })
  }

  onComplete = async () => {
    const { history, onboardingInitiator } = this.props

    this._removeBeforeUnload()
    await this._onOnboardingComplete()
    if (onboardingInitiator) {
      await returnToOnboardingInitiator(onboardingInitiator)
    }
    history.push(DEFAULT_ROUTE)
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this._beforeUnload.bind(this))
  }

  componentWillUnmount = () => {
    this._removeBeforeUnload()
  }

  render() {
    const { t } = this.context

    return (
      <div className="end-of-flow">
        <MetaFoxLogo></MetaFoxLogo>
        <Button
          type="primary"
          className="first-time-flow__button"
          onClick={this.onComplete}
        >
          {t('endOfFlowMessage10')}
        </Button>
      </div>
    )
  }
}
