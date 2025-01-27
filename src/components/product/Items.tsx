import { ChangeEvent, FC, FocusEvent } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

import { addItem, removeItem, setManualCount } from "@components/cart/slice";

import { FaPlus, FaMinus } from "react-icons/fa";

import { ItemCounter, ItemCard, ItemSide } from "./styles";

interface ItemsProps {
    inputCounts: { [key: string]: string };
    setInputCounts: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const Items: FC<ItemsProps> = ({ inputCounts, setInputCounts }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state: RootState) => state.cart.items);
    const product = useAppSelector((state: RootState) => state.catalog.currentProduct);

    const cartWithDetails = cartItems.map((cartItem: any) => {
        const item = product.items.find((i: any) => i.id === cartItem.itemId);
        return {
            ...item,
            count: cartItem.count,
        };
    });

    const handlePress = (side: "left" | "right", item: any) => {
        if (side === "left") {
            dispatch(removeItem({ productId: product.id, itemId: item.id }));
        } else {
            dispatch(addItem({ productId: product.id, itemId: item.id }));
        }
    };

    const handleManualChange = (event: ChangeEvent<HTMLInputElement>, itemId: string) => {
        const newCount = event.target.value;
        const isValidNumber = /^[0-9\b]+$/.test(newCount);
        if (newCount === "" || (isValidNumber && Number(newCount) < 1000)) {
            setInputCounts((prevCounts) => ({
                ...prevCounts,
                [itemId]: newCount,
            }));
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>, itemId: string) => {
        const newCount = event.target.value || "0";
        setInputCounts((prevCounts) => ({
            ...prevCounts,
            [itemId]: newCount,
        }));
        dispatch(setManualCount({ productId: product.id, itemId, count: Number(newCount) }));
    };

    return (
        <>
            {product.items.map((item: any) => {
                const cartItem = cartWithDetails.find((cartItem) => cartItem.id === item.id);
                const count = inputCounts[item.id] ?? (cartItem ? cartItem.count.toString() : "0");

                return (
                    <ItemCard key={item.id}>
                        <h3>{item.name}</h3>
                        <p>В наличии: {item.amount}</p>
                        <ItemCounter>
                            <button>
                                <FaMinus size={18} />
                            </button>
                            <input
                                type="number"
                                min="0"
                                maxLength={3}
                                value={count}
                                onFocus={(e) =>
                                    setInputCounts((prevCounts) => ({ ...prevCounts, [item.id]: "" }))
                                }
                                onBlur={(e) => handleBlur(e, item.id)}
                                onChange={(e) => handleManualChange(e, item.id)}
                            />
                            <button>
                                <FaPlus size={18} />
                            </button>
                        </ItemCounter>
                        <ItemSide>
                            <button onClick={() => handlePress("left", item)} className="left"></button>
                            <button onClick={() => handlePress("right", item)} className="right"></button>
                        </ItemSide>
                    </ItemCard>
                );
            })}
        </>
    );
};

export default Items;
