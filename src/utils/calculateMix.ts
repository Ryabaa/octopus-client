type MixedItem = {
    id: string;
    count: number;
};

export const calculateMix = (items: any, desiredTotal: number): MixedItem[] => {
    const minPercentage = 0.1;
    const totalAvailable = items.reduce((sum: any, item: any) => sum + item.amount, 0);

    if (totalAvailable === 0) {
        return items.map((item: any) => ({
            id: item.id,
            count: 0,
        }));
    }

    const maxAmount = Math.max(...items.map((item: any) => item.amount));
    const filteredItems = items.filter((item: any) => item.amount / maxAmount >= minPercentage);

    let filteredTotalAvailable = filteredItems.reduce((sum: any, item: any) => sum + item.amount, 0);

    if (filteredTotalAvailable === 0) {
        return filteredItems.map((item: any) => ({
            id: item.id,
            count: 0,
        }));
    }

    if (filteredTotalAvailable < desiredTotal) {
        const excludedItems = items.filter((item: any) => item.amount / maxAmount < minPercentage);
        for (const item of excludedItems) {
            if (filteredTotalAvailable >= desiredTotal) break;
            filteredItems.push(item);
            filteredTotalAvailable += item.amount;
        }
    }

    const proportions = filteredItems.map((item: any) => ({
        id: item.id,
        proportion: item.amount / filteredTotalAvailable,
        available: item.amount,
    }));

    const mix = proportions.map((item: any) => ({
        id: item.id,
        available: item.available,
        count: Math.min(Math.floor(desiredTotal * item.proportion), item.available),
    }));

    let remaining = desiredTotal - mix.reduce((sum: any, item: any) => sum + item.count, 0);

    for (const item of mix) {
        if (remaining === 0) break;
        const additional = Math.min(item.available - item.count, remaining);
        item.count += additional;
        remaining -= additional;
    }

    return mix.filter((item: any) => item.count > 0);
};
