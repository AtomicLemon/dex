import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as LogoSvg } from '../../../assets/icons/erc721_logo.svg';
import { goToHomeErc721, goToMyCollectibles } from '../../../store/router/actions';
import { themeBreakPoints } from '../../../themes/commons';
import { Logo } from '../../common/logo';
import { separatorTopbar, ToolbarContainer } from '../../common/toolbar';
import { NotificationsDropdownContainer } from '../../notifications/notifications_dropdown';
import { WalletConnectionContentContainer } from '../account/wallet_connection_content';

import { Search } from './inputSearch';

interface DispatchProps {
    onGoToHome: () => any;
    goToMyCollectibles: () => any;
}

type Props = DispatchProps;

const MyWalletLink = styled.a`
    align-items: center;
    color: #333;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    ${separatorTopbar}
`;

const LogoHeader = styled(Logo)`
    ${separatorTopbar}
`;

const WalletDropdown = styled(WalletConnectionContentContainer)`
    display: none;
    @media (min-width: ${themeBreakPoints.sm}) {
        align-items: center;
        display: flex;
        ${separatorTopbar}
    }
`;

const ToolbarContent = (props: Props) => {
    const handleLogoClick: React.EventHandler<React.MouseEvent> = e => {
        e.preventDefault();
        props.onGoToHome();
    };
    const startContent = <LogoHeader text="0x Collectibles" image={<LogoSvg />} onClick={handleLogoClick} />;

    const handleMyWalletClick: React.EventHandler<React.MouseEvent> = e => {
        e.preventDefault();
        props.goToMyCollectibles();
    };
    const endContent = (
        <>
            <MyWalletLink href="/my-collectibles" onClick={handleMyWalletClick}>
                My Collectibles
            </MyWalletLink>
            <WalletDropdown />
            <NotificationsDropdownContainer />
        </>
    );
    const centerContent = <Search />;

    return <ToolbarContainer startContent={startContent} centerContent={centerContent} endContent={endContent} />;
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        onGoToHome: () => dispatch(goToHomeErc721()),
        goToMyCollectibles: () => dispatch(goToMyCollectibles()),
    };
};

const ToolbarContentContainer = connect(
    null,
    mapDispatchToProps,
)(ToolbarContent);

export { ToolbarContent, ToolbarContentContainer };