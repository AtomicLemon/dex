import { BigNumber } from '0x.js';
import React, { HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { goToIndividualCollectible } from '../../../store/router/actions';

interface OwnProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
    name: string;
    price: BigNumber | null;
    image: string;
    color: string;
}

interface DispatchProps {
    goToIndividualCollectible: (collectibleId: string) => any;
}

type Props = DispatchProps & OwnProps;

const CollectibleAssetWrapper = styled.div`
    display: inline-block;
    position: relative;
    background: #ffffff;
    border: 1px solid #ededed;
    box-sizing: border-box;
    border-radius: 4px;
    width: 256px;
    height: 313px;
    margin-bottom: 8px;
    cursor: pointer;
`;

const ImageWrapper = styled.div<{ color: string }>`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 13.1%;
    background: ${props => props.color};
    border-radius: 4px;
`;

const Image = styled.div<{ image: string }>`
    position: absolute;
    width: 216px;
    height: 221px;
    left: calc(50% - 216px / 2);
    top: calc(50% - 221px / 2);
    background-size: 100% 100%;
    background-image: url(${props => props.image});
`;

const Title = styled.label`
    position: absolute;
    width: 154px;
    height: 17px;
    left: 10px;
    bottom: 12px;

    font-family: Inter UI;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
`;

const Badge = styled.div`
    position: absolute;
    width: 84px;
    height: 31px;
    right: 10px;
    top: 10px;

    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
`;

const BadgeImport = styled.span`
    position: absolute;
    width: 42px;
    height: 23px;
    right: 30px;
    top: 6px;

    font-family: Inter UI;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    font-feature-settings: 'tnum' on, 'onum' on;

    color: #000000;
`;

const BadgeAsset = styled.span`
    position: absolute;
    width: 20px;
    height: 15px;
    right: 9px;
    top: 11px;

    font-family: Inter UI;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px; /* identical to box height */
    font-feature-settings: 'tnum' on, 'onum' on;

    color: #000000;
`;

export const CollectibleAsset: React.FC<Props> = (props: Props) => {
    const { id, name, price, image, color, ...restProps } = props;

    const handleAssetClick: React.EventHandler<React.MouseEvent> = e => {
        e.preventDefault();
        props.goToIndividualCollectible(id);
    };

    return (
        <CollectibleAssetWrapper {...restProps} onClick={handleAssetClick}>
            <ImageWrapper color={color}>
                {price && (
                    <Badge>
                        <BadgeImport>{price.toString()}</BadgeImport>
                        <BadgeAsset>ETH</BadgeAsset>
                    </Badge>
                )}
                <Image image={image} />
            </ImageWrapper>
            <Title>{name}</Title>
        </CollectibleAssetWrapper>
    );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        goToIndividualCollectible: (collectibleId: string) => dispatch(goToIndividualCollectible(collectibleId)),
    };
};

export const CollectibleAssetContainer = connect(
    null,
    mapDispatchToProps,
)(CollectibleAsset);
