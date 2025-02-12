export function formatPrices(prices: { [key: number]: number }[]) {
    return prices.map((priceObj) => {
        const key = Number(Object.keys(priceObj)[0]);
        const value = priceObj[key];
        return { key, value };
    });
}
