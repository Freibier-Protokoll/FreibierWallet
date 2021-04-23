import React, { useContext, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { I18nContext } from '../../../contexts/i18n';
import { useEqualityCheck } from '../../../hooks/useEqualityCheck';
import { MetaMetricsContext } from '../../../contexts/metametrics.new';
import Button from '../../ui/button';
import Popover from '../../ui/popover';
import { updateViewedNotifications } from '../../../store/actions';
import { getTranslatedUINoficiations } from '../../../../../shared/notifications';
import { ETH_SWAPS_TOKEN_OBJECT } from '../../../../../shared/constants/swaps';
import { BUILD_QUOTE_ROUTE } from '../../../helpers/constants/routes';
import { getSortedNotificationsToShow } from '../../../selectors';

function getActionFunctions(metricsEvent) {
  const actionFunctions = {
    1: () => {
      metricsEvent({
        event: 'Swaps Opened',
        properties: { source: 'Main View', active_currency: 'ETH' },
        category: 'swaps',
      });
      global.platform.openExtensionInBrowser(
        BUILD_QUOTE_ROUTE,
        `fromAddress=${ETH_SWAPS_TOKEN_OBJECT.address}`,
      );
    },
    2: () => {
      global.platform.openTab({
        url: 'https://metamask.io/download.html',
      });
    },
    3: () => {
      global.platform.openTab({
        url:
          'https://survey.alchemer.com/s3/6173069/MetaMask-Extension-NPS-January-2021',
      });
    },
  };

  return actionFunctions;
}

export default function WhatsNewPopup({ onClose }) {
  const metricsEvent = useContext(MetaMetricsContext);
  const t = useContext(I18nContext);

  const actionFunctions = getActionFunctions(metricsEvent);

  const notifications = useSelector(getSortedNotificationsToShow);

  const contentRef = useRef();

  const memoizedNotifications = useEqualityCheck(notifications);
  const idRefMap = useMemo(
    () =>
      memoizedNotifications.reduce(
        (_idRefMap, notification) => ({
          ..._idRefMap,
          [notification.id]: React.createRef(),
        }),
        {},
      ),
    [memoizedNotifications],
  );

  const renderFirstNotification = (notification, id, date) => {
    return (
      <div
        className={classnames(
          'whats-new-popup__notification whats-new-popup__first-notification',
        )}
        key="whats-new-popop-notificatiion-0"
      >
        {notification.image && (
          <img
            className="whats-new-popup__notification-image"
            src={notification.image}
          />
        )}
        <div className="whats-new-popup__notification-title">
          {notification.title}
        </div>
        <div
          className="whats-new-popup__description-and-date"
          ref={idRefMap[id]}
        >
          <div className="whats-new-popup__notification-description">
            {notification.description}
          </div>
          <div className="whats-new-popup__notification-date">{date}</div>
        </div>
        {notification.actionText && (
          <Button
            type="secondary"
            className="whats-new-popup__button"
            rounded
            onClick={actionFunctions[id]}
          >
            {notification.actionText}
          </Button>
        )}
      </div>
    );
  };

  const renderSubsequentNotification = (notification, id, date, index) => {
    return (
      <div
        className={classnames('whats-new-popup__notification')}
        key={`whats-new-popop-notificatiion-${index}`}
      >
        <div className="whats-new-popup__notification-title">
          {notification.title}
        </div>
        <div
          className="whats-new-popup__description-and-date"
          ref={idRefMap[id]}
        >
          <div className="whats-new-popup__notification-description">
            {notification.description}
          </div>
          <div className="whats-new-popup__notification-date">{date}</div>
        </div>
        <div className="whats-new-popup__link" onClick={actionFunctions[id]}>
          {notification.actionText}
        </div>
      </div>
    );
  };

  return (
    <Popover
      className="whats-new-popup__popover"
      title={t('whatsNew')}
      onClose={() => {
        const {
          bottom: containerBottom,
        } = contentRef.current.getBoundingClientRect();

        const currentlySeenNotifications = {};
        Object.keys(idRefMap).forEach((notificationId) => {
          const { bottom: descriptionBottom } = idRefMap[
            notificationId
          ].current.getBoundingClientRect();

          if (descriptionBottom < containerBottom) {
            currentlySeenNotifications[notificationId] = true;
          }
        });

        updateViewedNotifications(currentlySeenNotifications);

        onClose();
      }}
      contentRef={contentRef}
      mediumHeight
    >
      <div className="whats-new-popup__notifications">
        {notifications.map(({ id, date }, index) => {
          const notification = getTranslatedUINoficiations(t)[id];
          return index === 0
            ? renderFirstNotification(notification, id, date)
            : renderSubsequentNotification(notification, id, date, index);
        })}
      </div>
    </Popover>
  );
}

WhatsNewPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};