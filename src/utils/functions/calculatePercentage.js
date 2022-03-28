


export const calculatePercentage = (price) => {
    const percentage =
        ((price.oldPrice - price.newPrice) * 100) / price.oldPrice;
    return Math.round(percentage);
};