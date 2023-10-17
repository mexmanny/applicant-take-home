import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout-redemption.less';
import { formatter } from '../../../utils/constants';

interface CheckoutRedemptionProps {
    selectedValues?: PrizeoutOfferValueOptions;
}

export const CheckoutRedemption: React.FC<CheckoutRedemptionProps> = ({ selectedValues }): React.ReactElement => {
    return selectedValues ? (
        <div className="checkout__redemption">
            <div className="row">
                <div className="label">Redemption Amount</div>
                <div className="amount">{formatter.format(selectedValues.cost_in_cents / 100)}</div>
            </div>
            <div className="row">
                <div className="prizeout-bonus-label">Prizeout Bonus {'(+' + selectedValues.display_bonus + '%)'}</div>
                <div className="prizeout-bonus-value">
                    {formatter.format((selectedValues.cost_in_cents * selectedValues.display_bonus) / 10000)}
                </div>
            </div>
            <div className="row">
                <div className="label">You Get</div>
                <div className="total">{formatter.format(selectedValues.value_in_cents / 100)}</div>
            </div>
        </div>
    ) : null;
};
