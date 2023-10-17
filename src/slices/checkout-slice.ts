import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from './offers-slice';

export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    view: ViewEnum;
    giftCard: PrizeoutOffer;
    values: PrizeoutOfferValueOptions;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    giftCard: {
        checkout_hero_url: '',
        currency_code: '',
        description: '',
        giftcard_list: [],
        image_url: '',
        is_enabled: false,
        logomark_url: '',
        name: '',
        stores: [],
        support_creative_list: [],
        tag: '',
    },
    isCollapsedCheckoutPanelOpen: false,
    loading: false,
    values: {
        checkout_value_id: '',
        cost_in_cents: 0,
        value_in_cents: 0,
    },
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setGiftCard(state, action: PayloadAction<PrizeoutOffer>) {
            state.giftCard = action.payload;
        },
        setValues(state, action: PayloadAction<PrizeoutOfferValueOptions>) {
            state.values = action.payload;
        },

        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setCheckoutView, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading, setGiftCard, setValues } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectChosenGiftCard = ({ checkout: { giftCard } }: RootState): PrizeoutOffer => giftCard;
export const selectValues = ({ checkout: { values } }: RootState): PrizeoutOfferValueOptions => values;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;
