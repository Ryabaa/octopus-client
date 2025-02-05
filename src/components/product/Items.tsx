import { FC } from "react";
import { useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";
import { ItemCatalog, Line } from "./styles";
import ItemCard from "./ItemCard";

interface ItemsProps {
    localValues: { [key: string]: string };
    setLocalValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const Items: FC<ItemsProps> = ({ localValues, setLocalValues }) => {
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);

    const inStockItems = product ? product.items.filter((item: any) => item.amount > 0) : [];
    const outOfStockItems = product ? product.items.filter((item: any) => item.amount === 0) : [];

    const itemsWithDetails = cartItems.map((cartItem: any) => {
        const item = product.items.find((i: any) => i.id === cartItem.itemId);
        return {
            ...item,
            count: cartItem.count,
        };
    });

    return (
        <>
            <ItemCatalog isOutOfStock={false}>
                {inStockItems.map((item: any) => {
                    const cartItem = itemsWithDetails.find((cartItem: any) => cartItem.id === item.id);
                    return (
                        <ItemCard
                            key={item.id}
                            item={item}
                            localValues={localValues}
                            setLocalValues={setLocalValues}
                            cartItem={cartItem}
                            productId={product.id}
                        />
                    );
                })}
            </ItemCatalog>
            <Line width={"85%"} color={"#e7e7e7"} />
            <ItemCatalog isOutOfStock={true}>
                {outOfStockItems.map((item: any) => (
                    <ItemCard key={item.id} item={item} isOutOfStock={true} />
                ))}
            </ItemCatalog>
        </>
    );
};

export default Items;
