import React from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import { ETHERSCAN_KOVAN_URL, ETHERSCAN_MAINNET_URL, MAINNET_ID } from '../../common/constants';
import { getNetworkId } from '../../store/selectors';
import { CancelablePromise, makeCancelable } from '../../util/cancelable_promises';
import { themeColors, themeDimensions } from '../../util/theme';
import { tokenAmountInUnits } from '../../util/tokens';
import { Notification, NotificationKind, OrderSide, StoreState } from '../../util/types';
import { NotificationCancelIcon } from '../common/icons/notification_cancel_icon';
import { NotificationCheckmarkIcon } from '../common/icons/notification_checkmark_icon';
import { Interval } from '../common/interval';
import { PendingTime } from '../common/pending_time';
import { Spinner } from '../common/spinner';

interface OwnProps {
    item: Notification;
    estimatedTxTimeMs: number;
}

interface StateProps {
    networkId: number | null;
}

type Props = StateProps & OwnProps;

interface State {
    pending: boolean;
}

const NotificationWrapper = styled.div<{ active?: boolean }>`
    align-items: center;
    background-color: ${props => (props.active ? themeColors.rowActive : 'transparent')};
    border-bottom: 1px solid ${themeColors.borderColor};
    display: flex;
    justify-content: space-between;
    padding: 20px ${themeDimensions.horizontalPadding};

    &:last-child {
        border-bottom-left-radius: ${themeDimensions.borderRadius};
        border-bottom-right-radius: ${themeDimensions.borderRadius};
        border-bottom: none;
    }

    &:hover {
        background-color: ${themeColors.notificationActive};
        cursor: pointer;
    }
`;

const NotificationContent = styled.div`
    flex-grow: 1;
    padding-right: 25px;
`;

const NotificationTitle = styled.h2`
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    margin: 0 0 8px;
`;

const NotificationText = styled.p`
    color: ${themeColors.textLight};
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
    margin: 0;
`;

const NotificationIcon = styled.div`
    flex-shrink: 0;
`;

class NotificationItem extends React.Component<Props, State> {
    private _txMined: CancelablePromise<any> | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            pending: false,
        };
    }

    public componentDidMount = async () => {
        const { item } = this.props;

        if (item.kind === NotificationKind.Market || item.kind === NotificationKind.CancelOrder) {
            this.setState({
                pending: true,
            });

            this._txMined = makeCancelable(item.tx);

            await this._txMined.promise.finally(() => this.setState({ pending: false }));
        }
    };

    public componentWillUnmount = () => {
        if (this._txMined) {
            this._txMined.cancel();
        }
    };

    public render = () => {
        const { item } = this.props;

        const title = this._getTitleFromItem(item);
        const text = this._getTextFromItem(item);

        return (
            <NotificationWrapper active={this.state.pending} onClick={this._goToEtherscan(item)}>
                <NotificationContent>
                    <NotificationTitle>{title}</NotificationTitle>
                    <NotificationText>{text}</NotificationText>
                </NotificationContent>
                <NotificationIcon>{this._getNotificationIcon(item)}</NotificationIcon>
            </NotificationWrapper>
        );
    };

    private readonly _goToEtherscan = (item: Notification) => () => {
        const { networkId } = this.props;
        const url = networkId === MAINNET_ID ? ETHERSCAN_MAINNET_URL : ETHERSCAN_KOVAN_URL;

        const win = window.open(`${url}/${item.id.slice(0, 66)}`, '_blank');

        if (win) {
            win.focus();
        }
    };

    private readonly _getTitleFromItem = (item: Notification): string => {
        let operation: string;

        switch (item.kind) {
            case NotificationKind.Market:
                operation = item.side === OrderSide.Buy ? 'Market Buy' : 'Market Sell';
                break;
            case NotificationKind.CancelOrder:
                operation = 'Cancelled Order';
                break;
            case NotificationKind.Limit:
                operation = item.side === OrderSide.Buy ? 'Limit Buy' : 'Limit Sell';
                break;
            case NotificationKind.OrderFilled:
                operation = item.side === OrderSide.Buy ? 'Buy Order Filled' : 'Sell Order Filled';
                break;
            default: {
                const _exhaustiveCheck: never = item;
                operation = _exhaustiveCheck;
            }
        }

        const amount = tokenAmountInUnits(item.amount, item.token.decimals);
        return `${operation} ${amount} ${item.token.symbol.toUpperCase()}`;
    };

    private readonly _getTextFromItem = (item: Notification): React.ReactNode => {
        const { estimatedTxTimeMs } = this.props;

        if (this.state.pending) {
            return (
                <Interval delay={1000}>
                    {now => <PendingTime now={now} startTime={item.timestamp} estimatedTimeMs={estimatedTxTimeMs} />}
                </Interval>
            );
        }

        const formatter = (value: number, unit: string, suffix: string) => {
            if (unit === 'second') {
                return 'Just now';
            } else {
                return `${value}  ${unit}${value > 1 ? 's' : ''} ${suffix}`;
            }
        };

        return <TimeAgo date={item.timestamp} formatter={formatter} />;
    };

    private readonly _getNotificationIcon = (item: Notification) => {
        if (this.state.pending) {
            return <Spinner />;
        } else if (item.kind === NotificationKind.CancelOrder) {
            return <NotificationCancelIcon />;
        } else {
            return <NotificationCheckmarkIcon />;
        }
    };
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        networkId: getNetworkId(state),
    };
};

const NotificationItemContainer = connect(mapStateToProps)(NotificationItem);

export { NotificationItem, NotificationItemContainer };
