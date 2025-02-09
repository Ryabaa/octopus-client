import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";
import { ItemCatalog, Line } from "./styles";
import ItemCard from "./ItemCard";

interface ItemsProps {
    localValues: { [key: string]: string };
    setLocalValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    isFromCart?: boolean;
}

const Items: FC<ItemsProps> = ({ localValues, setLocalValues, isFromCart }) => {
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);

    const [itemsWithDetails, setItemsWithDetails] = useState<any>([]);

    useEffect(() => {
        const newItemsWithDetails = product.items
            .map((item: any) => {
                const cartItem = cartItems.find(
                    (cartItem: any) => cartItem.productId === product.id && cartItem.itemId === item.id
                );
                return {
                    ...item,
                    count: cartItem ? cartItem.count : 0,
                };
            })
            .filter((item: any) => !isFromCart || item.count > 0);

        setItemsWithDetails(newItemsWithDetails);
    }, [cartItems, product]);

    return (
        <>
            <ItemCatalog isOutOfStock={false}>
                {itemsWithDetails
                    .filter((item: any) => item.availability > 0)
                    .map((item: any) => {
                        return (
                            <ItemCard
                                key={item.id}
                                item={item}
                                localValues={localValues}
                                setLocalValues={setLocalValues}
                                isOutOfStock={false}
                            />
                        );
                    })}
            </ItemCatalog>
            {!isFromCart && (
                <>
                    <Line width={"320px"} color={"#4b4b4b"} />
                    <ItemCatalog isOutOfStock={true}>
                        {product.items
                            .filter((item: any) => item.availability === 0)
                            .map((item: any) => (
                                <ItemCard key={item.id} item={item} isOutOfStock={true} />
                            ))}
                    </ItemCatalog>
                </>
            )}
        </>
    );
};

export default Items;
