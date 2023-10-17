import React, { useState } from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer } from '../../../../../slices/offers-slice';

import './offer-gift-card.less';
import { setGiftCard, setValues } from '../../../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: () => void;
    isSelected?: boolean;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({
    offer,
    onClickHandler,
    isSelected,
}): React.ReactElement => {
    let activeOfferId;
    const dispatch = useDispatch<AppDispatch>();
    const firstGiftCard = offer.giftcard_list[0];
    const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = firstGiftCard.display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'offer-gift-card--active': isSelected,
        'offer-gift-card--selected': activeOfferId === firstGiftCard.checkout_value_id,
    });

    const selectOfferOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            dispatch(setGiftCard(offer));
            onClickHandler();
        }
    };

    return (
        <div
            className={classes}
            onClick={() => {
                dispatch(setGiftCard(offer));
                dispatch(setValues(null));
                onClickHandler();
            }}
            onKeyDown={(event) => selectOfferOnEnter(event)}
            role="button"
            tabIndex={0}
        >
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
