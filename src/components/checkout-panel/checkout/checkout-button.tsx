import React from 'react';
import { Button } from '../../common';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { useAppSelector } from '../../../hooks';
import { selectChosenGiftCard, selectValues } from '../../../slices/checkout-slice';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const selectedValues = useAppSelector(selectValues);
    const giftCardName = useAppSelector(selectChosenGiftCard).name;

    const buttonText = 'Prizeout Gift Card';

    type MockPayLoad = {
        selectedValues?: PrizeoutOfferValueOptions;
        giftCardName?: string;
    };

    const checkoutMockCall = (data: MockPayLoad) =>
        new Promise<Response>((resolve, reject) => {
            if (
                !data.selectedValues.checkout_value_id ||
                !data.selectedValues.cost_in_cents ||
                !data.selectedValues ||
                !data.selectedValues.value_in_cents
            ) {
                reject(new Error('Required info not sent in request'));
                return;
            }

            const responseData = {
                checkout_value_id: data.selectedValues.checkout_value_id,
                cost_in_cents: data.selectedValues.cost_in_cents,
                display_bonus: data.selectedValues.display_bonus,
                display_monetary_bonus: data.selectedValues.display_monetary_bonus,
                value_in_cents: data.selectedValues.value_in_cents,
            };

            const mockResponse = new Response(JSON.stringify(responseData), {
                headers: {
                    'Content-Type': 'application/json',
                },
                status: 201,
            });

            setTimeout(() => {
                resolve(mockResponse);
            }, 250);
        });

    const buttonHandler = async () => {
        try {
            const payload: MockPayLoad = {
                giftCardName: giftCardName,
                selectedValues: selectedValues,
            };
            const mockResponse: Response = await checkoutMockCall(payload);

            if (mockResponse.ok) {
                const data = await mockResponse.json();
                //leaving console.log to validate data
                console.log('DATA:', data);
                alert('Checkout Success');
                window.location.reload();
            } else {
                console.error('Checkout failed:', mockResponse.status, mockResponse.statusText);
                alert('Checkout Not Successful');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Select a Redemption Amount');
        }
    };
    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
