import React, { useState } from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';

import './checkout.less';
import { Button, GiftCardImage } from '../../common';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { CheckoutRedemption } from '../checkout-redemption/checkout-redemption';
import { selectValues, setValues } from '../../../slices/checkout-slice';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { formatter } from '../../../utils/constants';

interface checkoutView {
    selectedGiftCard?: PrizeoutOffer;
}
const CheckoutPanelView: React.FC<checkoutView> = ({ selectedGiftCard }): React.ReactElement => {
    const dispatch = useDispatch();
    const selectedValues = useAppSelector(selectValues);
    const [selectedValueId, setSelectedValueId] = useState(null);

    return (
        <section className="checkout">
            <div className="grid grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand"></section>
                    <GiftCardImage imgUrl={selectedGiftCard.image_url} altText="giftcard image"></GiftCardImage>
                    <h1>{selectedGiftCard.name}</h1>
                    <p>Select Redemption Amount</p>
                    <div className="checkout__gift-card-cost-options">
                        {selectedGiftCard.giftcard_list
                            ? selectedGiftCard.giftcard_list.map((values: PrizeoutOfferValueOptions) => {
                                  return (
                                      <Button
                                          ariaLabel="Select your offer"
                                          className={
                                              values.checkout_value_id === selectedValueId
                                                  ? 'gift-card-cost-option active'
                                                  : 'gift-card-cost-option'
                                          }
                                          key={values.checkout_value_id}
                                          onClick={() => {
                                              setSelectedValueId(values.checkout_value_id);
                                              dispatch(setValues(values));
                                          }}
                                          size="small"
                                          text={formatter.format(values['cost_in_cents'] / 100)}
                                      ></Button>
                                  );
                              })
                            : ''}
                    </div>
                </div>
                <div className="grid__item">
                    <CheckoutRedemption selectedValues={selectedValues} />
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
