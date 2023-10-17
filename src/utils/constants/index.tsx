export const constants = {
    defaultGiftCardUrl: 'https://assets.prizeout.com/widget/global/generic-giftcard.png',
};

export const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
});
